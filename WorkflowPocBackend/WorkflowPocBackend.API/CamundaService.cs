using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;

namespace WorkflowPocBackend
{
	internal class CamundaService
	{
		private const string baseUrl = "http://localhost:8080/engine-rest/";
		private const string processDefinitionKey = "onboarding";
		private const string selectOfferingTopic = "selectOffering";
		private const string captureOfferingDetailsTopic = "captureOfferingDetails";
		private const string addUserTopic = "addUser";
		private const string initialiseOfferingTopic = "initialiseOffering";
		private const string sendWelcomeLetterTopic = "sendWelcomeLetter";

		private static readonly HttpClient httpClient = new HttpClient(new HttpClientHandler
		{
			Proxy = new WebProxy { BypassProxyOnLocal = true }
		});

		internal void StartInstance()
		{
			var payload = new StringContent(JsonConvert.SerializeObject(new { processDefinitionKey }), Encoding.UTF8, "application/json");
			var result = httpClient.PostAsync($"{baseUrl}process-instance", payload).Result;
			var resultString = result.Content.ReadAsStringAsync().Result;
			var instances = JsonConvert.DeserializeObject<ProcessInstanceDto[]>(resultString);
			foreach (var instance in instances)
			{
				Console.WriteLine($"Deleting instance {instance.id}");
				result = httpClient.DeleteAsync($"{baseUrl}process-instance/{instance.id}").Result;
				if (!result.IsSuccessStatusCode)
					throw new Exception($"{result.StatusCode}");
			}

			payload = new StringContent("{}", Encoding.UTF8, "application/json");
			result = httpClient.PostAsync($"{baseUrl}process-definition/key/{processDefinitionKey}/start", payload).Result;
			if (!result.IsSuccessStatusCode)
				throw new Exception($"{result.StatusCode}");

			Console.WriteLine("Started instance");
		}

		internal void SelectOffering(string offering)
		{
			CompleteTask(selectOfferingTopic, new { offering = new { value = offering } });
		}

		internal void CaptureOfferingDetails()
		{
			CompleteTask(captureOfferingDetailsTopic);
		}

		internal void AddUser(bool addAnother)
		{
			CompleteTask(addUserTopic, new { addAnother = new { value = addAnother } });
		}

		internal void InitialiseOffering()
		{
			CompleteTask(initialiseOfferingTopic);
		}

		internal void SendWelcomeLetter()
		{
			CompleteTask(sendWelcomeLetterTopic);
		}

		internal string GetOfferingType()
		{
			var resultString = Call($"{baseUrl}variable-instance", new { variableName = "offering" });
			var variables = JsonConvert.DeserializeObject<List<VariableDto>>(resultString);
			return variables[0].value;
		}

		private void CompleteTask(string topic, object variables = null)
		{
			var workerId = Guid.NewGuid().ToString();

			var fetchAndLockPayload = new
			{
				maxTasks = 1,
				workerId,
				topics = new[]
				{
					new
					{
						topicName = topic,
						lockDuration = 20000
					}
				}
			};

			var resultString = Call($"{baseUrl}external-task/fetchAndLock", fetchAndLockPayload);

			var tasks = JsonConvert.DeserializeObject<List<TaskInstanceDto>>(resultString);
			if (tasks.Count == 0)
			{
				Console.WriteLine($"No {topic} task found.");
				return;
			}

			Console.WriteLine($"{topic} task variables: {JsonConvert.SerializeObject(tasks[0].variables)}");

			var completePayload = new
			{
				workerId,
				variables = variables ?? new object()
			};

			Call($"{baseUrl}external-task/{tasks[0].id}/complete", completePayload);

			Console.WriteLine($"{topic} task completed.");
		}

		private string Call(string url, object requestData)
		{
			var payload = new StringContent(JsonConvert.SerializeObject(requestData), Encoding.UTF8, "application/json");
			var result = httpClient.PostAsync(url, payload).Result;
			return result.Content.ReadAsStringAsync().Result;
		}

		private class ProcessInstanceDto
		{
			public string id;
		}

		private class TaskInstanceDto
		{
			public string id;
			public object variables;
		}

		private class VariableDto
		{
			public string value;
		}
	}
}

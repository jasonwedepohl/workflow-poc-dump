using Microsoft.AspNetCore.Mvc;
using WorkflowPocBackend.API.Models;
using WorkflowPocBackend.API.Models.Requests;

namespace WorkflowPocBackend.API.Controllers
{
	[ApiController]
	public class WorkflowPocController : ControllerBase
	{
		private static readonly CamundaService camundaService = new CamundaService();
		private PrimaryContext _context;

		public WorkflowPocController(PrimaryContext context)
		{
			_context = context;
		}

		[HttpPost("workflow-poc/start")]
		public IActionResult Start()
		{
			camundaService.StartInstance();
			return Ok();
		}

		[HttpPost("workflow-poc/select-offering/{offering}")]
		[ProducesResponseType(typeof(string), 200)]
		[ProducesResponseType(typeof(string), 400)]
		public IActionResult SelectOffering([FromRoute(Name = "offering")] string offering)
		{
			camundaService.SelectOffering(offering);
			return Ok();
		}

		[HttpPost("workflow-poc/add-offering-a")]
		[ProducesResponseType(typeof(string), 200)]
		[ProducesResponseType(typeof(string), 400)]
		public IActionResult AddOfferingA(CreateOfferingRequest request)
		{
			//logic for adding offering A goes here:
			var offering = new Offering
			{
				Type = "A",
				FieldA = request.FieldA,
				FieldB = request.FieldB,
				FieldC = request.FieldC
			};

			_context.Offerings.Add(offering);
			_context.SaveChanges();

			camundaService.CaptureOfferingDetails();

			return Ok(offering.Id);
		}

		[HttpPost("workflow-poc/add-offering-b")]
		[ProducesResponseType(typeof(string), 200)]
		[ProducesResponseType(typeof(string), 400)]
		public IActionResult AddOfferingB(CreateOfferingRequest request)
		{
			//logic for adding offering B goes here:
			var offering = new Offering
			{
				Type = "B",
				FieldA = request.FieldA,
				FieldB = request.FieldB,
				FieldC = request.FieldC,
				FieldD = request.FieldD
			};
			_context.Offerings.Add(offering);
			_context.SaveChanges();

			camundaService.CaptureOfferingDetails();

			return Ok(offering.Id);
		}

		[HttpGet("workflow-poc/get-offering-type-from-user-task")]
		[ProducesResponseType(typeof(string), 200)]
		[ProducesResponseType(typeof(string), 400)]
		public IActionResult GetOfferingTypeFromAddUserTask()
		{
			var offeringType = camundaService.GetOfferingType();
			return Ok(offeringType);
		}

		[HttpPost("workflow-poc/add-user")]
		[ProducesResponseType(typeof(string), 200)]
		[ProducesResponseType(typeof(string), 400)]
		public IActionResult AddUser(CreateUserRequest userRequest)
		{
			//logic for adding a user goes here:
			_context.Users.Add(new User
			{
				OfferingId = userRequest.OfferingId,
				Name = userRequest.Name,
				Surname = userRequest.Surname,
				Address = userRequest.Address
			});

			_context.SaveChanges();

			camundaService.AddUser(addAnother: userRequest.AddAnother);

			return Ok();
		}

		[HttpPost("workflow-poc/initialise-offering")]
		[ProducesResponseType(typeof(string), 200)]
		[ProducesResponseType(typeof(string), 400)]
		public IActionResult InitialiseOffering()
		{
			camundaService.InitialiseOffering();

			//TODO: Add logic to send welcome letter here

			camundaService.SendWelcomeLetter();
			return Ok();
		}
	}
}

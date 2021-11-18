import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class CamundaService {

    /*






                    This service didn't end up being used - it contains methods to call Camunda directly, 
                    and requires the proxy.conf.json file referenced in angular.json to avoid CORS issues







    */


    private readonly baseUrl = 'http://localhost:4200/engine-rest/';
    private readonly processDefinitionKey = 'onboarding';

    constructor(private httpClient: HttpClient) { }

    startOnboarding(onSuccess: () => void): void {
        this.getAndDeleteInstances(() => {
            console.log(`Starting new instance`);
            this.httpClient.post(`${this.baseUrl}process-definition/key/${this.processDefinitionKey}/start`, {})
                .subscribe(() => {
                    console.log('Started instance');
                    onSuccess();
                });
        });
    }

    selectOffering(offering: string, onSuccess: () => void): void {
        const workerId = "offeringWorkerId"; // TODO: In real project, workerId should be generated for each fetch-complete cycle
        const topic = "selectOffering";

        this.fetchTask(workerId, topic, task => {
            this.completeTask(workerId, { "offering": { "value": offering } }, task.id, onSuccess);
        });
    }

    private fetchTask(workerId: string, topic: string, onSuccess: (task: TaskInstance) => void) {
        const body = {
            "workerId": workerId,
            "maxTasks": 1,
            "topics": [
                {
                    "topicName": topic,
                    "lockDuration": "10000"
                }
            ]
        };
        this.httpClient.post<TaskInstance[]>(`${this.baseUrl}external-task/fetchAndLock`, body)
            .subscribe(tasks => {
                console.log(`Fetched task ${tasks[0].id} for topic ${topic}`);
                onSuccess(tasks[0]);
            });
    }

    private completeTask(workerId: string, variables: Object, taskId: string, onSuccess: () => void) {
        const body = {
            "workerId": workerId,
            "variables": variables
        };
        this.httpClient.post(`${this.baseUrl}external-task/${taskId}/complete`, body)
            .subscribe(() => {
                console.log(`Completed task ${taskId}`);
                onSuccess();
            });
    }

    private getAndDeleteInstances(onSuccess: () => void): void {
        console.log('Getting instances');

        this.httpClient.post<ProcessInstance[]>(`${this.baseUrl}process-instance`, { 'processDefinitionKey': this.processDefinitionKey })
            .subscribe(instances => {
                console.log(instances);
                console.log('Deleting instances');
                this.deleteInstances(instances, onSuccess);
            });
    }

    private deleteInstances(instances: ProcessInstance[], onSuccess: () => void): void {
        if (instances.length > 0) {
            console.log(`Deleting instance ${instances[0].id}`);
            this.httpClient.delete(`${this.baseUrl}process-instance/${instances[0].id}`)
                .subscribe(() => { this.deleteInstances(instances.splice(1), onSuccess); });
        } else {
            onSuccess();
        }
    };
}

interface ProcessInstance {
    id: string;
}

interface TaskInstance {
    id: string;
}
# Workflow POC API Project

This project exposes 3 endpoints to be consumed by the UI project for storing data to the database:
- workflow-poc/add-offering-a
- workflow-poc/add-offering-b
- workflow-poc/add-user

### Applying database migrations
[Before running these commands ensure that you have the 'Microsoft.EntityFrameworkCore.Tools' package installed]

To Add: `Add-Migration <MigrationName>`
To Remove: `Remove-Migration`
To create/update the database: `Update-Database`
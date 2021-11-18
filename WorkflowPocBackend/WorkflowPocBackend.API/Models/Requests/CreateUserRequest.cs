using System;

namespace WorkflowPocBackend.API.Models.Requests
{
  public class CreateUserRequest
  {
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Address { get; set; }
    public Guid OfferingId { get; set; }
    public bool AddAnother { get; set; }
  }
}

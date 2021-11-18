using System;

namespace WorkflowPocBackend.API.Models
{
  public class User
  {
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Address { get; set; }
    public Offering Offering { get; set; }
    public Guid OfferingId { get; set; }
  }
}

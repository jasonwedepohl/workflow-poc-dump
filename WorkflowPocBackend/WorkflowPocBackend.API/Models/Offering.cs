using System;

namespace WorkflowPocBackend.API.Models
{
  public class Offering
  {
    public Guid Id { get; set; }
    public string Type { get; set; }
    public string FieldA { get; set; }
    public string FieldB { get; set; }
    public string FieldC { get; set; }
    public string FieldD { get; set; }
  }
}

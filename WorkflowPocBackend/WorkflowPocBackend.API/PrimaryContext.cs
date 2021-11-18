using Microsoft.EntityFrameworkCore;
using WorkflowPocBackend.API.Models;

namespace WorkflowPocBackend.API
{
  public class PrimaryContext : DbContext
  {
    public PrimaryContext(DbContextOptions<PrimaryContext> dbContextOptions) : base(dbContextOptions) { }

    public virtual DbSet<Offering> Offerings { get; set; }
    public virtual DbSet<User> Users { get; set; }
  }
}

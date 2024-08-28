using System.ComponentModel.DataAnnotations;
using TrainingAssignmentsApi.Model;

namespace TrainingAssignmentsApi.Contracts;

// Requests
public record TrainingRequest([Required] string Requestor, [Required] DateTime StartTime, [Required] DateTime EndTime, [Required] IList<BusType> BusTypes);

public record GenerateRequest([Required, DataType(DataType.Date)] string Date, IDictionary<BusType, int> Capacities);

// Responses
public record GenerateResponse([Required] Dictionary<BusType, Dictionary<int, List<TrainingAssignmentResponse>>> GroupedAssignments);

public record TrainingAssignmentResponse([Required] string Requestor, [Required] DateTime StartTime, [Required] DateTime EndTime);
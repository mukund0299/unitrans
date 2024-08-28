using System.ComponentModel.DataAnnotations;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using TrainingAssignmentsApi.Mappers;
using TrainingAssignmentsApi.Contracts;
using TrainingAssignmentsApi.Service;

namespace TrainingAssignmentsApi.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiVersion("1")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly ISchedulerService _schedulerService;

        public ScheduleController(ISchedulerService schedulerService) {
            _schedulerService = schedulerService;
        }

        [HttpPut]
        [Route("")]
        public GenerateResponse GenerateAssignments([FromBody, Required] GenerateRequest request) {
            var assignments = _schedulerService.GenerateAssignments(DateOnly.Parse(request.Date), request.Capacities);
            return GenerateResponseMapper.ToGenerateResponse(assignments);
        }

        [HttpGet]
        [Route("")]
        public GenerateResponse GetAssignments([FromQuery, Required, DataType(DataType.Date)] string date) {
            var assignments = _schedulerService.GetAssignments(DateOnly.Parse(date));
            return GenerateResponseMapper.ToGenerateResponse(assignments);
        }

        [HttpDelete]
        [Route("")]
        public void DeleteAssignments([FromQuery, Required, DataType(DataType.Date)] string date) {
            _schedulerService.DeleteAssignments(DateOnly.Parse(date));
        }
    }
}

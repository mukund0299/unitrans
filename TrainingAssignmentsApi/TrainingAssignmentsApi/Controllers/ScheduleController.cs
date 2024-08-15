using System.ComponentModel;
using Asp.Versioning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using Serilog.Core;
using TrainingAssignmentsApi.Mappers;
using TrainingAssignmentsApi.Model;
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
        public GenerateResponse Generate([FromBody] GenerateRequest request) {
            var assignments = _schedulerService.GenerateAssignments(request.Requests, request.Capacities);
            return GenerateResponseMapper.ToGenerateResponse(assignments);
        }

        [HttpGet]
        [Route("")]
        public GenerateResponse GetAssignments([FromQuery] DateOnly date) {
            throw new NotImplementedException();
        }

        [HttpDelete]
        [Route("")]
        public bool DeleteAssignments([FromQuery] DateOnly date) {
            throw new NotImplementedException();
        }
    }
}

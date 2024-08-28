using System.ComponentModel.DataAnnotations;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using TrainingAssignmentsApi.Contracts;
using TrainingAssignmentsApi.DataAccess;

namespace TrainingAssignmentsApi.Controllers
{
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiVersion("1")]
    [ApiController]
    public class PreferencesController : ControllerBase
    {
        private readonly IPreferencesDataAccessService _preferencesDataAccessService;

        public PreferencesController(IPreferencesDataAccessService preferencesDataAccessService)
        {
            _preferencesDataAccessService = preferencesDataAccessService;
        }

        [HttpPut]
        [Route("")]
        public void SaveRequests([FromBody, Required] List<TrainingRequest> requests) {
            _preferencesDataAccessService.SaveRequests(requests.Select(x => new Model.Request(x.Requestor, x.StartTime, x.EndTime, x.BusTypes)).ToList());
        }

        [HttpPost]
        [Route("")]
        public List<TrainingRequest> AddRequest([FromBody, Required] TrainingRequest request) {
            var date = DateOnly.FromDateTime(request.StartTime);
            var pastRequests = _preferencesDataAccessService.GetRequests(date);
            var currentRequest = new Model.Request(request.Requestor, request.StartTime, request.EndTime, request.BusTypes);
            pastRequests.Add(currentRequest);
            _preferencesDataAccessService.SaveRequests(pastRequests);
            return pastRequests.Select(x => new TrainingRequest(x.Requestor, x.StartTime, x.EndTime, x.BusTypes)).ToList();
        }

        [HttpGet]
        [Route("")]
        public List<TrainingRequest> GetRequests([FromQuery, Required, DataType(DataType.Date)] string date) {
            return _preferencesDataAccessService.GetRequests(DateOnly.Parse(date)).Select(x => new TrainingRequest(x.Requestor, x.StartTime, x.EndTime, x.BusTypes)).ToList();
        }
    }
}

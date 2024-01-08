

using Microsoft.AspNetCore.Mvc;
using JobTrackPro.Sevices;
using JobTrackPro.ApiModels;
using JobTrackPro.Models;
using JobTrackPro.Helpers;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;


namespace JobTrackPro.Controllers
{


    public class SkillController : ControllerBase
    {

        private readonly SkillService _skillservice;

        public SkillController(Model_DataContext model_DataContext)
        {
            _skillservice = new SkillService(model_DataContext);
           
        }

      
        [HttpGet]
        [Route("api/skills")]
        [Authorize]
        // [AllowAnonymous]
        public IActionResult GetAllSkills()
        {
            ResponseType type = ResponseType.Success;
            var message = "Success";
            try
            {
                IEnumerable<SkillResponseModel> data = _skillservice.GetSkills();

                if (!data.Any())
                {
                    type = ResponseType.NotFound;
                    message = "Not found";
                }

                return Ok(ResponseHandler.GetAppResponses(type, data, message));
            }
            catch (Exception ex)
            {

                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }



    
        [HttpGet("{id}")]
        [Route("api/skills/{id}")]
        [Authorize]
        public IActionResult GetSkillById(string id)
        {
            ResponseType type = ResponseType.Success;
            var message = "Success";
            try
            {
                SkillResponseModel? data = _skillservice.GetSkillById(id);
                if (data == null) return BadRequest(ResponseHandler.GetAppResponses(ResponseType.BadRequest, data, "Invalid skill id"));
                return Ok(ResponseHandler.GetAppResponses(type, data, message));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }


        // save new user
        [HttpPost]
        [Route("api/skills")]
        [Authorize]
        public IActionResult CreateSkill([FromBody] SkillRequestModel skillBody)
        {
            try
            {
                SkillResponseModel? skill = _skillservice.GetSkillByTitle(skillBody.title);
                if (skill != null) return BadRequest(ResponseHandler.GetAppResponses(ResponseType.BadRequest, skill, "Skill already exist"));
                ResponseType type = ResponseType.Success;
                var message = "Success";
                SkillResponseModel data = _skillservice.CreateSkill(skillBody);
                return Ok(ResponseHandler.GetAppResponses(type, data, message));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }


        [HttpPut("{id}")]
        [Route("api/skills/{id}/update")]
        [Authorize]
        public IActionResult UpdateSkill([FromBody] SkillRequestModel skillBody, string id)
        {
            try
            {
                SkillResponseModel? user = _skillservice.GetSkillById(id);
                if (user == null) return BadRequest(ResponseHandler.GetAppResponses(ResponseType.BadRequest, user, "Invalid userId"));
                ResponseType type = ResponseType.Success;
                var message = "Success";
                SkillResponseModel data = _skillservice.UpdateSkill(skillBody, id);
                return Ok(ResponseHandler.GetAppResponses(type, data, message));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }

    }
}

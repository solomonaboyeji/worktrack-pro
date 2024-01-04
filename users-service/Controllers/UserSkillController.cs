using JobTrackPro.ApiModels;
using JobTrackPro.Helpers;
using JobTrackPro.Models;
using JobTrackPro.Sevices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace JobTrackPro.Controllers
{
   
    public class UserSkillController : ControllerBase
    {

        private readonly UserSkillService _userskillservice;

        public UserSkillController(Model_DataContext model_DataContext)
        {
            _userskillservice = new UserSkillService(model_DataContext);

        }


        [HttpGet]
        [Route("api/userskills")]
        [Authorize]

        public IActionResult GetAllUserSkills()
        {
            ResponseType type = ResponseType.Success;
            var message = "Success";
            try
            {
                IEnumerable<UserSkillResponseModel> data = _userskillservice.GetUserSkills();

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



        [HttpGet]
        [Route("api/userskills/user/all")]
        [Authorize]

        public IActionResult GetAllSkillsForAUser()
        {
            ResponseType type = ResponseType.Success;
            var message = "Success";
            try
            {
                var userId = HttpContext.User.FindFirst("id")?.Value;
                IEnumerable<UserSkillResponseModel> data = _userskillservice.GetAllSkillsByUser(userId);

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
        [Route("api/userskills/one/{id}")]
        [Authorize]
        public IActionResult GetUserSkillById(string id)
        {
            ResponseType type = ResponseType.Success;
            var message = "Success";
            try
            {
                UserSkillResponseModel? data = _userskillservice.GetUserSkillById(id);
                if (data == null) return BadRequest(ResponseHandler.GetAppResponses(ResponseType.BadRequest, data, "Invalid skill id"));
                return Ok(ResponseHandler.GetAppResponses(type, data, message));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }



        [HttpPost]
        [Route("api/userskills")]
        [Authorize]
        public IActionResult CreateUserSkill([FromBody] UserSkillRequestModel userSkillBody)
        {
            try
            {
                UserSkillResponseModel? userskill = _userskillservice.getUserSkillByUserIdAndSkillId(userSkillBody);
                if (userskill != null) return BadRequest(ResponseHandler.GetAppResponses(ResponseType.BadRequest, userskill, "User already has this skill"));
                ResponseType type = ResponseType.Success;
                var message = "Success";
                _userskillservice.CreateUserSkill(userSkillBody);
                return Ok(ResponseHandler.GetAppResponses(type, null, message));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }


        [HttpDelete("{id}")]
        [Route("api/userskills/remove/one/{id}")]
        [Authorize]
        public IActionResult RemoveUserSkill(string id)
        {
            try
            {
                UserSkillResponseModel? userskill = _userskillservice.GetUserSkillById(id);
                if (userskill == null) return BadRequest(ResponseHandler.GetAppResponses(ResponseType.BadRequest, userskill, "Invalid userSkillId"));
                ResponseType type = ResponseType.Success;
                var message = "Success";
                _userskillservice.DeleteUserSkill(id);
                return Ok(ResponseHandler.GetAppResponses(type, null, message));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }

    }

}
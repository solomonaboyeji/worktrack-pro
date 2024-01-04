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

   
    public class UserController : ControllerBase
    {

        private readonly UserService _userservice;

        private readonly PasswordUtils _passwordUtils;

        private readonly TokenHandler _tokenHandler;

        public UserController(Model_DataContext model_DataContext, PasswordUtils passwordUtils, TokenHandler tokenHandler)
        {
            _userservice = new UserService(model_DataContext);
            _passwordUtils = passwordUtils;
            _tokenHandler = tokenHandler;
        }

        // GET: api/<UserController>
        [HttpGet]
        [Route("api/users")]
        [Authorize]
        // [AllowAnonymous]
        public IActionResult GetAllUsers()
        {
            ResponseType type = ResponseType.Success;
            var message = "Success";
            try
            {
                IEnumerable<UserModel> data = _userservice.GetUsers();

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



        // GET api/<UserController>/5
        [HttpGet("{id}")]
        [Route("api/users/{id}")]
        [Authorize]
        public IActionResult GetUserById(string id)
        {
            ResponseType type = ResponseType.Success;
            var message = "Success";
            try
            {
                UserModel? data = _userservice.GetUserById(id);
                if (data == null) return BadRequest(ResponseHandler.GetAppResponses(ResponseType.BadRequest, data, "Invalid user id"));
                return Ok(ResponseHandler.GetAppResponses(type, data, message));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }


        // save new user
        [HttpPost]
        [Route("api/users")]
        public IActionResult CreateUser([FromBody] UserRequestModel userbody)
        {
            try
            {
                UserModel? user = _userservice.GetUserByEmail(userbody.email);
                if (user != null) return BadRequest(ResponseHandler.GetAppResponses(ResponseType.BadRequest, user, "User already exist"));
                string hashedPassword = _passwordUtils.HashPassword(userbody.password);
                userbody.password = hashedPassword;
                ResponseType type = ResponseType.Success;
                var message = "Success";
                UserModel data = _userservice.CreateUser(userbody);
                return Ok(ResponseHandler.GetAppResponses(type, data, message));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }

        
        // edit user details
        [HttpPut("{id}")]
        [Route("api/users/{id}/update")]
        [Authorize]
        public IActionResult UpdateUser([FromBody] UpdateUserRequest userbody, string id)
        {
            try
            {
                UserModel? user = _userservice.GetUserById(id);
                if (user == null) return BadRequest(ResponseHandler.GetAppResponses(ResponseType.BadRequest, user, "Invalid userId"));
                ResponseType type = ResponseType.Success;
                var message = "Success";
                UserModel data = _userservice.UpdateUser(userbody, id);
                return Ok(ResponseHandler.GetAppResponses(type, data, message));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }


        // login
        [HttpPost]
        [Route("api/users/signin")]
        public IActionResult SignIn([FromBody] SignInUserRequestModel userbody)
        {
            try
            {
                User? user = _userservice.GetUserByEmailFull(userbody.email);
                if (user == null) return BadRequest(ResponseHandler.GetAppResponses(ResponseType.BadRequest, user, "Invalid Credential"));
                bool verifyPassword = _passwordUtils.VerifyPassword(userbody.password, user.password);
                if(!verifyPassword) return BadRequest(ResponseHandler.GetAppResponses(ResponseType.BadRequest, null, "Invalid Credential"));
                var token = _tokenHandler.GenerateToken(user);
                ResponseType type = ResponseType.Success;
                var message = "Success";
                UserModel userResponse = new UserModel
                {
                    id = user.id,
                    firstName = user.first_name,
                    lastName = user.last_name,
                    email = user.email,
                    phoneNumber = user.phone_number,
                    isEnabled = user.is_enabled,
                    isVerified = user.is_verified,
                    isLegalStatus = user.is_legal_status,
                    postCode = user.post_code,
                    dob = user.dob,
                    starTime = user.start_time,
                    role = user.role,
                    createdAt = user.created_at,
                    updatedAt = user.updated_at
                };

                SignInUserResponseModel data = new SignInUserResponseModel { token = token, profile = userResponse};
                return Ok(ResponseHandler.GetAppResponses(type, data, message));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }


        // change password
        [HttpPatch]
        [Route("api/users/change-password")]
        [Authorize]
        public IActionResult ChangePassword([FromBody] ChangePasswordRequestModel userbody)
        {
            try
            {
                // Access user claims from HttpContext.User
                var userId = HttpContext.User.FindFirst("id")?.Value;
            
                Console.WriteLine(userId);
                
                User? user = _userservice.GetUserByIdFull(userId);
                if (user == null) return BadRequest(ResponseHandler.GetAppResponses(ResponseType.BadRequest, user, "Invalid Credential"));
                bool verifyPassword = _passwordUtils.VerifyPassword(userbody.oldPassword, user.password);
                if (!verifyPassword) return BadRequest(ResponseHandler.GetAppResponses(ResponseType.BadRequest, null, "Invalid Old Password"));
                string hashedPassword = _passwordUtils.HashPassword(userbody.newPassword);
                userbody.newPassword = hashedPassword;
                _userservice.UpdatePassword(userbody, userId);
                ResponseType type = ResponseType.Success;
                var message = "Success";
                return Ok(ResponseHandler.GetAppResponses(type, null, message));
            }
            catch (Exception ex)
            {
                return BadRequest(ResponseHandler.GetExceptionResponse(ex));
            }
        }

    }
}

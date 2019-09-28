namespace BCP.CredinetWeb.Core.MicroService
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Filters;

    public class CwController : Controller
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var modelState = context.ModelState;

            if (!modelState.IsValid)
            {
                var result = new BadRequestObjectResult(context.ModelState);
                result.StatusCode = 422;
                context.Result = result;
            }

            base.OnActionExecuting(context);
        }
    }
}
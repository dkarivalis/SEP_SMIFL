package controllers;

import play.*;
import play.mvc.*;

import securesocial.core.Identity;
import securesocial.core.java.BaseUserService;
import securesocial.core.java.SecureSocial;
import play.libs.Json;
import com.fasterxml.jackson.databind.node.ObjectNode;

import service.MyUserService;

import models.*;

import views.html.*;

/**
 * Our main controller for routing to major pages,
 * content will be handled by AJAX calls
 */
public class Application extends Controller {

  public static Logger.ALogger logger = Logger.of("application.controllers.Application");

  /**
   * We don't ever go to index, everything sits at login or elsewhere
   * so we redirect as appropriate
   * @return always returns a redirect to login or to the user portfolio
   */
  @SecureSocial.UserAwareAction
  public static Result index() {
    Identity identity = (Identity) ctx().args.get(SecureSocial.USER_KEY);

    if ( identity == null ) {
      return redirect("/login");
    }
    return redirect("/p");
  }

  //this should simply load the page but we'll leave this for testing
  //until the view is built out
  /**
   * Get a user and load their portfolio, or if the user doesn't exist,
   * register them and generate a new global portfolio.
   */
  //TODO this should be done in the portfolio controller
  @SecureSocial.SecuredAction
  public static Result portfolio() {
    
    Identity identity = (Identity) ctx().args.get(SecureSocial.USER_KEY);
    User user = User.find(identity.email().get());
    ObjectNode result;
    Portfolio port;
    
    if ( user != null ) {
      result = user.getJson();
      port = Portfolio.getPortfolio( user.id, 1 );
      result.put("globalPortfolio", port.getJson() );
      result.put("cashPosition", Position.getCashPosition( port.id ).getJson() );
      return ok(result);
    }

    //THIS SHOULDN'T HAPPEN
    result = Json.newObject();
    result.put("status", "KO");
    result.put("message", "fixme" );

    return badRequest(result);
  }

}


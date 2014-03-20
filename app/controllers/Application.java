package controllers;

import play.*;
import play.mvc.*;

import securesocial.core.Identity;
import securesocial.core.java.BaseUserService;
import securesocial.core.java.SecureSocial;

import service.MyUserService;

import models.User;

import views.html.*;

public class Application extends Controller {

  public static Logger.ALogger logger = Logger.of("application.controllers.Application");


  @SecureSocial.SecuredAction
  public static Result index() {

    Identity identity = (Identity) ctx().args.get(SecureSocial.USER_KEY);

    if ( identity == null ) {
      return redirect("/login");
    }
    return redirect("/p");
  }

  @SecureSocial.SecuredAction
  public static Result portfolio() {
    
    Identity identity = (Identity) ctx().args.get(SecureSocial.USER_KEY);
    User user = User.find(identity.email().get());
    
    if ( user == null ) {
      user = User.add(identity.firstName(), identity.lastName(), identity.email().get());
    }
    if ( user == null ) {
      return badRequest();
    }
    return ok(user.getJson());
  }

  //This is just example code
  @SecureSocial.UserAwareAction
  public static Result userAware() {
    Identity user = (Identity) ctx().args.get(SecureSocial.USER_KEY);
    final String userName = user != null ? user.fullName() : "guest";

    return ok("Hello" + userName);
  }

}

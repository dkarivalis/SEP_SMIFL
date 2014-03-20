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
    if (logger.isWarnEnabled()) {
      logger.warn("access granted to index");
    }
    Identity user = (Identity) ctx().args.get(SecureSocial.USER_KEY);

    
    return ok(index.render(user));
  }

  @SecureSocial.SecuredAction
  public static Result portfolio() {
    if (logger.isWarnEnabled()) {
      logger.warn("access granted to index");
    }
    Identity identity = (Identity) ctx().args.get(SecureSocial.USER_KEY);
    User user = User.find(identity.email);
    if ( user == null ) {
      user = User.add(identity.firstName, identity.lastName, identity.email);
    }
    if user( == null ) {
      return badRequest();
    }
    return ok(user.getJson())
    //return ok(index.render(user));
  }

  @SecureSocial.UserAwareAction
  public static Result userAware() {
    Identity user = (Identity) ctx().args.get(SecureSocial.USER_KEY);
    final String userName = user != null ? user.fullName() : "guest";

    return ok("Hello" + userName);
  }

  @SecureSocial.SecuredAction
  public static Result linkResult() {
    Identity id = (Identity) ctx().args.get(SecureSocial.USER_KEY);

    MyUserService service = (MyUserService) Play.application().plugin(BaseUserService.class);
    MyUserService.User user = service.userForIdentity(id);

    return ok(linkResult.render(id, user.identities));

  }

}

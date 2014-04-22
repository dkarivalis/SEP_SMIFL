package controllers;

import play.*;
import play.mvc.*;
import java.util.*;
import securesocial.core.Identity;
import securesocial.core.java.BaseUserService;
import securesocial.core.java.SecureSocial;
import models.*;

import play.libs.Json;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import service.*;
import views.html.*;

public class LeagueController extends Controller {

	/**
   * Method for returning a badRequest for an invalid stock ticker.
   * @param message is the message to return in the Result
   * @return a JSON Result
   */
  private static Result invalidRequest( final String message ) {
      return badRequest(
              Json.newObject()
              .put("status", "KO")
              .put("message", message)
              );
  }

  /**
   * Method for ensuring that a user attempting to make a trade
   * is authorized to do so.
   * @param portfolioId is the DB id for a portfolio
   * @param userId is the OAuth userId
   * @return true is they are authorized, false otherwise.
   */
  private static boolean validateUser( final long portfolioId, final String userId ) {
      User user = User.findUserId(userId);
      Portfolio port = Portfolio.find( portfolioId );
      if ( user == null || port == null) {
          return false;
      }
      return user.id == port.userId;
  }

  public static Result addPublicLeague ( final String name, final String goal, final long ownerId, final double initialBalance, final double brokerageFee ) {
		
    return addPrivateLeague( name, goal, null, ownerId, initialBalance, brokerageFee );
  }

  public static Result addPrivateLeague ( final String name, final String goal, final String passkey, final long ownerId, final double initialBalance, final double brokerageFee ) {
		
		//TODO: CHECK IF LEAGUE ALREADY EXISTS
    League league = League.add ( name, goal, passkey, ownerId, initialBalance, brokerageFee );
    ObjectNode result = Json.newObject();

    if ( league == null ) {
      result.put("status", "KO");
      result.put("message", "Failed to create a league");
      return badRequest(result);
    }
    else {
      result.put("status", "OK");
      result.put("league", league.getJson());
      return ok(result);
    }
  }
  
  public static Result joinPublicLeague ( final long leagueId, final long userId ) {
		
    return joinPrivateLeague( leagueId, userId, null );
  }

  public static Result joinPrivateLeague ( final long leagueId, final long userId, final String passkey ) {
		ObjectNode result = Json.newObject();
    return ok(result);
  }
  
  public static Result searchLeague ( final String leagueName ) {
    
    List<League> tmp = League.searchByName( leagueName );
	  ArrayList<League> leagues = new ArrayList<League>(tmp);
		ObjectNode result = Json.newObject();
		ArrayNode leaguesObj = result.putArray("leagues");
		
		for (League league : leagues) {
		  System.out.println("found league");
			leaguesObj.add(league.getJson());			
		}
    
    return ok(result);
  }
  
	@SecureSocial.SecuredAction
  public static Result getPublicLeagues( final long userId ) {

      List<League> tmp = League.getAllPublicLeagues();
			ArrayList<League> leagues = new ArrayList<League>(tmp);
			ObjectNode result = Json.newObject();
			ArrayNode leaguesObj = result.putArray("leagues");
			
			for (League league : leagues) {
				leaguesObj.add(league.getJson());		
			}

      return ok(result);

  }

}



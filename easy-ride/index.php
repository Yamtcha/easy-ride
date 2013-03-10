<?php 
  include "templates/head.php";
?>
<link href="css/lib/bootstrap-datepicker.css" rel="stylesheet">
<link href="css/index.css" rel="stylesheet">
 <div class="container-fluid">
    <div class="row-fluid">
      <div id="search-bar">
        <!--Sidebar content-->
        <div class="form-horizontal well" id="search">
        <fieldset>
          <div class="control-group" id="search-route">
            <!-- From -->
            <div class="control-group">
              <label class="control-label">From</label>
              <div class="controls">
                <input class="input-xlarge" id="search-from" type="text" placeholder="Type the name of a place or address over here">
              </div>
            </div>

            <!-- To -->
            <div class="control-group">
              <label class="control-label">To</label>
              <div class="controls">
                <input class="input-xlarge" id="search-to" type="text" placeholder="Type the name of a place or address over here">
              </div>
            </div>
          </div>

          <!-- Departure Date -->
          <div class="control-group" id="search-departure">
            <label class="control-label">Date</label>
            <div class="controls">
              <div class="input-append date" id="search-departure-date" data-date="22-02-2013" data-date-format="dd-mm-yyyy">
               <input class="span8" size="16" type="text" >
                 <span class="add-on"><i class="icon-calendar"></i></span>
              </div>
            </div>
          </div>
        
          <!-- Women Only -->
          <div class="control-group" >
           <label class="checkbox">
            <div class="controls">
             <input type="checkbox" id="search-women-only"> Women Only
             </div>
           </label>
          </div>

         <!-- Search Button -->
         <div class="form-actions" >
           <button type="button" id="search-button" class="btn btn-primary">Search</button>
         </div>
         </fieldset>
         </form>
        </div><!-- End Sidebar Content -->
        <div class="well" id="search-results">
          <h4>Search Results</h4>
          <div id="trips"></div>
        </div>
      </div>
      <div id="map_canvas" class="well"></div>
    </div>
  </div>
<hr>
<!-- Load JS in the end for faster page loading -->
<script type="text/template" id="trip-template">
<div class="accordion-group trip-info" id="trip-<%= id %>">
  <div class="accordion-heading">
    <a class="accordion-toggle" data-toggle="collapse" data-parent="#trip-<%= id %>" href="#collapse-<%= id %>">
      <strong>From: </strong><%= origin.address %><br>
      <strong>To: </strong><%= destination.address %><br>
      <strong>Departure: </strong><%= departure_string %>
    </a>
  </div>
  <div id="collapse-<%= id %>" class="accordion-body collapse">
    <div class="accordion-inner">
      <strong>Trip Length: </strong><%= length %><br>
      <strong>Spots Remaining: </strong><%= spots %><br>
      <strong>Message: </strong><%= message %><br>
      <button type="button" class="btn btn-small btn-info"><i class='icon icon-road icon-white'></i> Request Ride</button>
    </div>
  </div>
</div>
</script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&libraries=places"></script>
<script src="js/lib/underscore.min.js"></script>
<script data-main="js/index.js" src="js/require.js"></script>
<?php include "templates/footer.php" ?>

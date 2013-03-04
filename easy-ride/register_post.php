<!DOCTYPE html>
<html lang='en'>
<?php 
    include 'head.php'; 
    include 'navbar.php'; 
    include_once 'functions.php';
?>

<body>

<?php 
    

    //Show some error if smth went wrong:
    $errors = array(); 

    // Check if there was no empty post request 

    if (!empty($_POST))

    {


          $error = $email = $password = "";

          // If the email is set for the session, then destroy the session

          if (isset($_SESSION['email'])) destroySession(); 

          $email = sanitizeString($_POST['register-email']);
          $pass = sanitizeString($_POST['register-password']);
          $first_name = sanitizeString($_POST['register-first-name']);
          $last_name = sanitizeString($_POST['register-last-name']);
          $gender = sanitizeString($_POST['register-gender']);
          $driver_License = sanitizeString($_POST['register-driver-license-id']);
          
          /* The salt String to increase password security */
          $saltString = "rideLikeABallerEasyRide";

          /* Encrypt the password with sha256 hashing algorithm and the provided salt */
          $pass = hash('sha256',$pass.$saltString);

          // Insert Details into the users table
          $query="INSERT INTO $users_table (
                                              firstName,
                                              lastName,
                                              password,
                                              emailAddress,
                                              gender,
                                              driversLicenseID
                                            ) 

                              VALUES(
                                            '$first_name',
                                            '$last_name',
                                            '$pass',
                                            '$email',
                                            '$gender',
                                            '$driver_License'
                                            )";

          // If the query wasn't successful, diplay the error

          if (!queryMysql($query))
          {

            die('Error: ' . mysql_error());
          }
          
          // Otherwise, the query was successful, let the user know it was a successful operation 

          else

          {
echo <<<_END
                    <div class="well ds-component ds-hover" data-componentid="well1">
                       <div class="ds-component ds-hover" data-componentid="content2">
                          <h1 style="text-align: center;">Success!</h1>
                             <p style="text-align: center;">You have successfully registered for Easy Ride!</p>
                        </div>
                     </div>
_END;
    
          }

  // Close the connection to the database 

  mysql_close($connection);
            
  } // End of the main if close that checks for empty post requests 

                 
  include 'footer.php';

    ?>

</body>
</html>
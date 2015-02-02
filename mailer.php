<?php

	require_once 'include/mandrill-api/src/Mandrill.php';
	require_once 'include/recaptcha/recaptchalib.php';
	require_once 'env/vars.php';

	// reCaptcha variables
	$siteKey = $recaptcha_key;
	$secret = $recaptcha_secret;
	$resp = null;
	$error = null;
	$reCaptcha = new ReCaptcha($secret);

	if ($_POST['g-recaptcha-response']) {

		$resp = $reCaptcha->verifyResponse(
      $_SERVER["REMOTE_ADDR"],
      $_POST["g-recaptcha-response"]
    );
	}

	if ($resp != null && $resp->success) {

		// Customer's form submission data
		if (!empty($_POST)) {
			$customer_name = $_POST['customer-name'];
			$customer_company_name = $_POST['company-name'];
			$customer_email = $_POST['customer-email'];
			$customer_phone = $_POST['customer-phone'];
			$customer_website = $_POST['customer-website'];
			$customer_project_description = stripslashes($_POST['project-description']);
			$customer_project_package = $_POST['project-package'];

			$message_lines = array(
				'<h2 style="border-bottom: 1px solid #aaa;">Customer Info</h2>',
				'<table style="margin-left: 15px;">',
					'<tr>',
						'<td style="font-weight: bold; width: 8em;">Name:</td>',
						'<td>' . $customer_name . '</td>',
					'</tr>',
					'<tr>',
						'<td style="font-weight: bold; width: 8em;">Company:</td>',
						'<td>' . $customer_company_name . '</td>',
					'</tr>',
					'<tr>',
						'<td style="font-weight: bold; width: 8em;">Email:</td>',
						'<td>' . $customer_email . '</td>',
					'</tr>',
					'<tr>',
						'<td style="font-weight: bold; width: 8em;">Phone:</td>',
						'<td>' . $customer_phone . '</td>',
					'</tr>',
					'<tr>',
						'<td style="font-weight: bold; width: 8em;">Website:</td>',
						'<td>' . $customer_website . '</td>',
					'</tr>',
					'<tr>',
						'<td style="font-weight: bold; width: 8em;">Package:</td>',
						'<td>' . $customer_project_package . '</td>',
					'</tr>',
				'</table>',
				'<br><br>',
				'<h2 style="border-bottom: 1px solid #aaa;">Project Description</h2>',
				'<p>' . $customer_project_description . '</p>'
			);
			$message_contents = join("", $message_lines);

		} else {
			$message_contents = "<em>-- No form data was sent! --</em>";
		}

		// Send dat email
		try {

			// Make a new instance of the Mandrill class
		    $mandrill = new Mandrill($mandrill_key);
		    
		    // Set all necessary datat to send to the Mandrill API 
		    $message = array(
		        'html' => $message_contents,
		        'subject' => 'New Inquiry: ' . $customer_website,
		        'from_email' => 'postman@stonecaststudio.com',
		        'from_name' => 'Stonecast Mailer',
		        'to' => array(
		            array(
		                'email' => 'info@stonecaststudio.com',
		                'name' => 'Stonecast Studio',
		                'type' => 'to'
		            )
		        ),
		        'headers' => array('Reply-To' => $customer_email),
		        'auto_text' => true
		    );
		    $async = false;
		    $result = $mandrill->messages->send($message);
		    

		    header('Content-Type: application/json');
				echo json_encode(array("success!" => $result));

		} catch(Mandrill_Error $e) {

			header('Content-Type: application/json');
		    
		    // Mandrill errors are thrown as exceptions
		    echo json_encode(array("response" => 'A mandrill error occurred: ' . get_class($e) . ' - ' . $e->getMessage()));
		    
		    // A mandrill error occurred: Mandrill_Unknown_Subaccount - No subaccount exists with the id 'customer-123'
		    throw $e;
		}
	} else {
		header('HTTP/1.1 401 Unauthorized', true, 401);
		header('Content-Type: application/json');

		echo json_encode(array("status" => "401 - Not Authorized", "message" => "reCaptcha verification failed", "reCaptcha response" => $resp));
	}
<?php
if ($_POST['Contact'] == "Send") {
	$submitted = true;
	$valid = false;

	$emailFrom = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
	$emailTo = "kevin@sevenheadsdesign.com";
	$subject = "Someone wants to talk to Seven Heads Design!";
	$name = filter_input(INPUT_POST, 'name');
	$company = filter_input(INPUT_POST, 'company');
	$reason = filter_input(INPUT_POST, 'reason');
	$moreInformation = filter_input(INPUT_POST, 'more-information');

	if ($name && $email) {
		$valid = true;
	}
	

	// prepare email body text
	$message = "";
	$message .= "Name: ";
	$message .= $name;
	$message .= "\n";
	$message .= "Company: ";
	$message .= $company;
	$message .= "\n";
	$message .= "Email: ";
	$message .= $emailFrom;
	$message .= "\n";
	$message .= "Reason for contacting: ";
	$message .= $reason;
	$message .= "\n";
	$message .= "Any more information: ";
	$message .= $moreInformation;
	$message .= "\n";

	// send email 
	$success = mail($emailTo, $subject, $message, "From: <$emailFrom>");

} else {
	$submitted = false;
}
?>
<!DOCTYPE html>

<html>
	<head>
		<title>Seven Heads Design</title>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width">
		
		<link rel="stylesheet" href="/css/style.css?1592564731" media="all">
		<link rel="stylesheet" href="/css/fonts.css?1392564711" media="only screen">
		<script>
			document.documentElement.className += " js";
		</script>
	</head>
	<body class="home" style="">	
		<div class="page" id="page">
	<!-- Begin .header -->
	<header class="header cf" role="banner" id="top">
		<a href="/"><img src="../../images/logo.svg" class="logo" alt="Seven Heads Design" onerror="this.onerror=null; this.src='../../images/logo.png'"></a>
		<nav id="nav" class="nav">
			<ul>
				<li><a href="/about">About</a></li>
				<li><a class="curPage" href="/#contact">Contact</a></li>
			</ul>
		</nav><!--end .nav-->
		<a id="toggle" href="#nav"><span><b class="is-vishidden">Menu</b></span></a>
	</header>
	<!-- End .header -->
	<div role="main">
		<div class="lc">
			<p class="intro">A network of <strong>highly experienced</strong> digital design thinkers who operate independently, but <strong>love working together.</strong></p>
		</div>
			<div class="block block-hero block-hero-temporary">
				<div class="lc">
					<div class="temporary-wrapper">
						<div class="inner-block">
							<p class="alpha align-center">Make <span>·</span> Collaborate <span>·</span> Celebrate</p>
							<a class="btn btn-transparent" href="/about">About</a>
						</div>
					</div>
				
			</div>	</div>
	<div class="lc align-center">
		<h1 id="contact">Let&rsquo;s work together</h1>
		<?php
		if ($submitted && $success) {
			?>
			<p class="beta align-center">Thanks, <?php echo $name; ?>!</p>
			<p>We&rsquo;ll be in touch within 24 hours or less. In the meantime why don&rsquo;t you <a href="http://www.twitter.com/7headsdesign">follow us on Twitter?</p>
			<?
		} else { ?>
			<form action="/#contact" method="post" class="para-form">  
				<p>Hello. How&rsquo;s it going <label class="is-vishidden" for="name">your name</label>
		        <input required="true" class="inline" id="name" name="name" type="text" placeholder="your name">? I know things have never been more exciting then they are now at <label class="is-vishidden" for="company">your company</label>
		        <input class="inline" id="company" name="company" type="text" placeholder="your company">. You know I&rsquo;m really happy to see you stopped by to tell us about <label class="is-vishidden" for="reason">your reason for contacting</label> <select id="reason" class="inline" name="reason">
		        	<option selected="" disabled="" value="">your reason for contacting</option>
		        	<option value="Scheduling a workshop">scheduling a workshop</option>
		        	<option value="Design consulting">design consulting</option>
		        	<option value="Just saying hello!">what you&rsquo;re up to :)</option>
		        </select>. I&rsquo;ll send you an e-mail at <input class="inline" required="true" id="email" name="email" type="email" placeholder="your e-mail"> so we can talk it over.</p>


		        <label for="more-information">If you have time, tell us more about that:</label>
		        <textarea name="more-information" id="more-information"></textarea>
		        <input type="submit" class="btn btn-large" name="Contact" value="Fire Away">
		</form>	
		<?php } ?>
		</div>
	<!-- Begin Footer -->
	<footer class="footer" role="contentinfo">
		<div class="lc">
		<p><a class="twitter" href="http://twitter.com/7headsdesign">Follow Seven Heads Design on Twitter</a></p>
		<p class="copyright">All content ©2014 Seven Heads Design unless otherwise noted.<br/><br/>Site by <a href="http://kevinsharon.com/">Kevin</a>, <a href="http://timkadlec.com/">Tim</a>, <a href="http://kevinmhoffman.com/">Kevin</a>, and <a href="http://danielmall.com/">Dan</a>.</p>

		</div>
	</footer>
	<!-- End Footer --></div>
	<!--DO NOT REMOVE-->

	<script src="/js/shd-min.js"></script>
	
</body></html>
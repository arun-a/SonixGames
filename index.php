<?php
require_once __DIR__ . '/../../../library/ch/nth/logic.php';
?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>IQZ Abo – Schweiz</title>

    <link rel="stylesheet" href="style.css">

    <!-- jQuery + device detection -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="/library/common/detect.js"></script>

    <script>
        // Boot payload from env.php + logic.php
        window.APP = <?= json_encode($boot, JSON_UNESCAPED_SLASHES|JSON_HEX_TAG|JSON_HEX_AMP|JSON_HEX_APOS|JSON_HEX_QUOT) ?>;

        // Switzerland: MO confirm, no PIN step
        var requires_pin_by_default = false;

        // Globals for JS
        var operator_code  = '';
        var shortcode      = '877';
        var keyword        = 'IQZ';

        var viewCode       = <?= json_encode($view_code ?? '') ?>;
        var user_agent     = <?= json_encode($user_agent ?? '') ?>;
        var gateway_code   = <?= json_encode($gateway_code ?? '') ?>;
        var ip_address     = <?= json_encode($ip_address ?? '127.0.0.1') ?>;
        var country_code   = <?= json_encode($country_code ?? '') ?>;
        var landing_page   = <?= json_encode($landing_page ?? '') ?>;
        var affiliate_code = <?= json_encode($affiliate_code ?? '') ?>;
        var queryString    = <?= json_encode($_SERVER['QUERY_STRING'] ?? '') ?>;
        var landingPageUrl = <?= json_encode((isset($_SERVER['HTTPS']) ? 'https' : 'http') . "://{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}") ?>;
    </script>

    <!-- CH view+lead logic -->
    <script src="/library/ch/nth/logic.js"></script>
</head>
<body>

<?php include 'layout.html'; ?>

</body>
</html>

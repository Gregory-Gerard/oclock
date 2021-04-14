<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Memory — O'clock</title>
    <link href="<?= $_ENV['DEBUG'] === 'true' ? router()->url('css/app.css') : router()->url('css/app.min.css') ?>" rel="stylesheet">
</head>
<body class="flex items-center text-center h-screen bg-gradient-to-br from-gray-900 to-black bg-fixed text-white">
    <main class="w-full">
        <h1 class="text-4xl font-bold mb-8">Memory 🔮</h1>

        <div class="mx-auto w-96 h-96" id="game">
            <div class="flex mb-2">
                <p>Tentative : <span id="match">0</span></p>
            </div>
            <div class="grid grid-rows-4 grid-cols-4 gap-4 w-full h-full p-4 rounded shadow-md bg-gray-900"></div>
        </div>
    </main>

    <script src="<?= $_ENV['DEBUG'] === 'true' ? router()->url('js/app.js?v=').uniqid() : router()->url('css/app.js') ?>"></script>
</body>
</html>
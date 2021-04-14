<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Memory — O'clock</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔮</text></svg>">
    <link href="<?= $_ENV['DEBUG'] === 'true' ? router()->url('css/app.css') : router()->url('css/app.min.css') ?>" rel="stylesheet">
</head>
<body class="flex items-center text-center h-screen min-h bg-gradient-to-br from-gray-900 to-black bg-fixed text-white">
    <main class="w-full px-4">
        <h1 class="text-4xl font-bold mb-8">Memory 🔮</h1>

        <div class="relative mx-auto lg:w-96 w-full " id="game">
            <div class="grid grid-rows-4 grid-cols-4 gap-4 w-full h-96 p-4 rounded overflow-hidden shadow-md bg-gray-900">
                <div id="game__start" class="absolute flex flex-col justify-center items-center w-full h-96 top-0 left-0 bg-gray-900 bg-opacity-75 z-10">
                    <button class="btn">
                        Démarrer
                    </button>
                    <a href="#" id="game__top" class="mt-2">Voir le classement</a>
                </div>
            </div>
            <div class="mt-8">
                <div class="flex mb-2 items-center justify-between">
                    <div>
                        <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                            Temps restant
                        </span>
                    </div>
                    <div class="text-right">
                        <span class="text-xs font-semibold" id="progress-time">

                        </span>
                    </div>
                </div>
                <div class="overflow-hidden h-2 flex rounded bg-purple-200" id="progress-bar">
                    <div style="width:100%" class="bg-purple-500 transition-all"></div>
                </div>
            </div>
        </div>
    </main>

    <script src="<?= $_ENV['DEBUG'] === 'true' ? router()->url('js/app.js?v=').uniqid() : router()->url('js/app.js') ?>"></script>
</body>
</html>
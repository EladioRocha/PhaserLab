# Phaser Game Examples

A collection of **JavaScript games and Phaser lessons** covering sprites, mouse input, animations, sound, lives, and game-over conditions.

## Run locally

The examples include browser entry points and assets. Serve the repository through HTTP so scripts and game assets can load consistently. With Python 3 installed:

```sh
python -m http.server 8000 --bind 127.0.0.1
```

Open **http://127.0.0.1:8000/** and choose an example.

## Examples

| Example | Entry point |
| --- | --- |
| Ninja Path | [Camino_ninja/index.html](Camino_ninja/index.html) |
| Lumberjack | [El_leniador/index.html](El_leniador/index.html) |
| Spaceship | [Nave_espacial/index.html](Nave_espacial/index.html) |
| Collect the Diamonds | [Recoge_los_diamantes/index.html](Recoge_los_diamantes/index.html) |
| Empty game template | [Template/index.html](Template/index.html) |

The [Ninja Path lesson sequence](02%20-%20Camino%20Ninja/) contains incremental versions covering project setup, tweening, mouse input, sprite inheritance, controls, animations, lives, JSON loading, and sound. Directory names are retained in their original form to preserve asset paths.

## Development and validation

Start with the selected example's `index.html` and its `src/` directory. These are older Phaser examples with bundled library files; upgrading Phaser requires checking the APIs used by each game.

There is no repository-wide package manifest or automated test suite. Check asset loading, controls, animations, audio, and end-of-game behavior manually. This documentation update did not perform a full browser playthrough.

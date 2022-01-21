import subprocess
import glob


def compile_notebooks():
    # jupyter nbconvert --to html /home/simo/devs/blog/simoryu-blog/src/notebooks/Trigonometric-Harmonic-series::Simo_Ryu_::2019-05-04.ipynb --output-dir /home/simo/devs/blog/simoryu-blog/src/notebooks/compiled_htmls --template basic
    # INPUT = "/home/simo/devs/blog/simoryu-blog/src/notebooks/Trigonometric-Harmonic-series::Simo_Ryu_::2019-05-04.ipynb"
    OUTPUT_DIR = "./src/notebooks/compiled_htmls"

    # activate conda
    # subprocess.run([])
    for file in glob.glob("./src/notebooks/*.ipynb"):
        subprocess.call(
            [
                "jupyter",
                "nbconvert",
                "--RegexRemovePreprocessor.patterns",
                "#rm.*",
                "--to",
                "html",
                file,
                "--output-dir",
                OUTPUT_DIR,
                "--template",
                "basic",
                "--no-prompt",
            ]
        )


compile_notebooks()

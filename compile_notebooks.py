import subprocess
import glob

def compile_notebooks():
    # jupyter nbconvert --to html /home/simo/devs/blog/simoryu-blog/src/notebooks/Trigonometric-Harmonic-series::Simo_Ryu_::2019-05-04.ipynb --output-dir /home/simo/devs/blog/simoryu-blog/src/notebooks/compiled_htmls --template basic
    #INPUT = "/home/simo/devs/blog/simoryu-blog/src/notebooks/Trigonometric-Harmonic-series::Simo_Ryu_::2019-05-04.ipynb"
    OUTPUT_DIR = "/home/simo/devs/blog/simoryu-blog/src/notebooks/compiled_htmls"

    # activate conda
    #subprocess.run([])
    for file in glob.glob("/home/simo/devs/blog/simoryu-blog/src/notebooks/*.ipynb"):
        subprocess.call(["jupyter", "nbconvert", "--to", "html", file, "--output-dir", OUTPUT_DIR, "--template", "basic", "--no-input"])

compile_notebooks()
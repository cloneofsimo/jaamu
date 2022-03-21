import os
import subprocess
import glob
import json
from bs4 import BeautifulSoup
from dotenv import load_dotenv

load_dotenv()

debug = True if os.getenv("DEBUG") == "TRUE" else False
mount_dir = "." if debug else os.getenv("MOUNT_DIR")

OUTPUT_DIR = f"{mount_dir}/src/notebooks/compiled_htmls"
META_DIR = f"{mount_dir}/src/notebooks/meta"
NOTEBOOK_DIR = f"{mount_dir}/src/notebooks/*.ipynb"


def compile_notebooks():
    # jupyter nbconvert --to html /home/simo/devs/blog/simoryu-blog/src/notebooks/Trigonometric-Harmonic-series::Simo_Ryu_::2019-05-04.ipynb --output-dir /home/simo/devs/blog/simoryu-blog/src/notebooks/compiled_htmls --template basic
    # INPUT = "/home/simo/devs/blog/simoryu-blog/src/notebooks/Trigonometric-Harmonic-series::Simo_Ryu_::2019-05-04.ipynb"

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(META_DIR, exist_ok=True)

    # activate conda
    # subprocess.run([])
    for file in glob.glob(NOTEBOOK_DIR):
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

        html_file = OUTPUT_DIR + "/" + file.split("/")[-1].split(".")[0] + ".html"
        # read html file and parse TOC
        with open(html_file, "r") as f:
            html = f.read()

        soup = BeautifulSoup(html)

        toc = []
        header_id = 1
        current_list = toc
        previous_tag = None

        for header in soup.findAll(["h1", "h2", "h3"]):
            print(header)
            # header['id'] = header_id

            if previous_tag == "h1" and header.name == "h2":
                current_list = []
            elif previous_tag == "h2" and header.name == "h1":
                toc.append(current_list)
                current_list = toc

            current_list.append((header["id"], header.text))

            previous_tag = header.name

        if current_list != toc:
            toc.append(current_list)
        # result.append('<li><a href="#%s">%s</a></li>' % item)

        def list_to_html(lst):
            result = []
            for item in lst:
                if isinstance(item, list):
                    result.append(list_to_html(item))
                else:
                    result.append({"link": "#" + item[0], "name": item[1][:-1]})

            return result

        TOC_FILE = META_DIR + "/" + file.split("/")[-1].split(".")[0] + ".json"

        meta = {"TOC": list_to_html(toc)}

        import json

        with open(TOC_FILE, "w") as f:
            json.dump(meta, ensure_ascii=False, fp=f)


def compile_notebooks_md():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(META_DIR, exist_ok=True)

    for file in glob.glob(NOTEBOOK_DIR):
        subprocess.call(
            [
                "jupyter",
                "nbconvert",
                "--RegexRemovePreprocessor.patterns",
                "#rm.*",
                "--to",
                "markdown",
                file,
                "--output-dir",
                OUTPUT_DIR,
                "--no-prompt",
            ]
        )

        md_file = OUTPUT_DIR + "/" + file.split("/")[-1].split(".")[0] + ".md"
        print(md_file)
        # read html file and parse TOC
        with open(md_file, "r+") as f:
            content = f.read()

            splited = content.split('<script type="text/javascript">')
            content = splited[0]
            for script in splited[1:]:
                content += '<script type="text/javascript">'
                inner_splited = script.split("</script>")
                content += inner_splited[0].replace("\n\n", "\n")
                content += "</script>" + "</script>".join(inner_splited[1:])

            f.seek(0)
            f.write(content)

        toc = []

        for line in content.split("\n"):
            if line.startswith("#"):
                level = len(line) - len(line.lstrip("#"))
                header = line.strip("#").strip()
                header_id = header.replace(" ", "-")

                toc.append({"link": f"#{header_id}", "name": header})

        TOC_FILE = META_DIR + "/" + file.split("/")[-1].split(".")[0] + ".json"

        meta = {"TOC": toc}

        with open(TOC_FILE, "w") as f:
            json.dump(meta, ensure_ascii=False, fp=f)


if __name__ == "__main__":
    compile_notebooks()

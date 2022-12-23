from os import listdir
from os.path import isfile, join, dirname

if __name__ == "__main__":
    dirnama = dirname(__file__)
    onlyfiles = [f for f in listdir(dirnama) if isfile(join(dirnama, f))]
    for path in onlyfiles:
        # path = join(dirnama, "data.md")
        file = open(path, 'r')
        line = file.readline()

        dct = {}

        while line:
            for word in line.split(' '):
                if len(word) > 2:
                    word = word.upper()
                    nword = ""
                    for w in word:
                        if w.isalpha():
                            nword += w
                    if len(nword) > 2:
                        dct[nword] = (dct[nword] + 1) if (nword in dct) else 1
            # print(line + ">>\n")
            line = file.readline()
        items = sorted(dct.items(), key=lambda item:item[1], reverse=True)
        file.close()

        fs = open(path + ".search", 'w')
        outpt = ""
        for item in items:
            outpt += item[0] + ':' + item[1] + '\n'
        fs.write(outpt)
        fs.flush()
        fs.close()
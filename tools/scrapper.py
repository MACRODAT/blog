import os

if __name__ == "__main__":
    path = os.path.join(os.path.dirname(__file__), "data.md")
    file = open(path, 'r')
    line = file.readline()

    dct = {}

    while line:
        for word in line.split(' '):
            if len(word) > 2:
                word = word.upper()
                dct[word] = (dct[word] + 1) if (word in dct) else 1
        # print(line + ">>\n")
        line = file.readline()
    items = sorted(dct.items(), key=lambda item:item[1], reverse=True)
    file.close()
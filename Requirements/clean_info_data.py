def get_info(info):
    def clean_course_name(data):
        data = data[:data.find(" ",data.find(" ")+1)].strip()
        if data.startswith("("):
            data = data[1:]
        return data

    pre = False
    prerequisite = []
    general = []
    for j in info.split("*"):
        if j.startswith("Corequisite:"):
            pre = False
        elif j.startswith("Prerequisite:"):
            pre = True
            data = j.removeprefix("Prerequisite:").strip()
            
            if data != "__":
                data = clean_course_name(data)
                prerequisite.append(data)
        elif pre:
            if j.startswith("and"):
                data = j.removeprefix("and").strip()
                data = clean_course_name(data)
                prerequisite.append(data)
            elif j.startswith("or"):
                data = j.removeprefix("or").strip()
                data = clean_course_name(data)
                last_elem = prerequisite.pop()
                if type(last_elem) == list:
                    if data not in last_elem:
                        last_elem.append(data)
                    prerequisite.append(last_elem)
                elif type(last_elem) == str:
                    prerequisite.append([last_elem,data])
        
        elif j.startswith("General Requirements:"):
            data = j.removeprefix("General Requirements:").strip()
            if data != "":
                data = data[:data.find(".")].strip()
                general.append(int(data))

    return {"prerequisite":prerequisite,"general":general}
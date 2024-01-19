import requests
from bs4 import BeautifulSoup
import PyPDF2
import os
from db_connection import *
from clean_info_data import *
class FENSRequirements():

    def __init__(self, program_code, period ):

        self.program_type = "BS"
        self.program_code = program_code
        self.period = period
        self.domain = "https://www.sabanciuniv.edu"
        self.__types = {
            "ALL":{"Core Electives":"CEL", "Area Electives":"AEL", "Free Electives":"FEL"}, 
            "EE":{"Core Electives":"CEL", "Area Electives":"ARE", "Free Electives":"FRE"},
            }
        self.__main_link = "https://www.sabanciuniv.edu/en/prospective-students/degree-detail?SU_DEGREE.p_degree_detail%3fP_TERM="+self.period+"&P_PROGRAM="+self.program_type+self.program_code+"&P_SUBMIT=&P_LANG=EN&P_LEVEL=UG"
        self.__support_link = ["https://www.sabanciuniv.edu/en/prospective-students/degree-detail?SU_DEGREE.p_list_courses?P_TERM="+self.period+"&P_AREA=","&P_PROGRAM="+self.program_type+self.program_code+"&P_LANG=EN&P_LEVEL=UG"]
        self.__faculty_link = ["https://www.sabanciuniv.edu/en/prospective-students/degree-detail?SU_DEGREE.p_list_courses?P_TERM="+self.period+"&P_AREA=","&P_PROGRAM="+self.program_type+self.program_code+"&P_FAC=","&P_LANG=EN&P_LEVEL=UG"]
        if self.program_code not in self.__types.keys():
            self.__core_link = self.__support_link[0]+self.program_type+self.program_code+"_"+self.__types["ALL"]["Core Electives"]+self.__support_link[1]
            self.__area_link = self.__support_link[0]+self.program_type+self.program_code+"_"+self.__types["ALL"]["Area Electives"]+self.__support_link[1]
            self.__free_link = self.__support_link[0]+self.program_type+self.program_code+"_"+self.__types["ALL"]["Free Electives"]+self.__support_link[1]
        else:
            self.__core_link = self.__support_link[0]+self.program_type+self.program_code+"_"+self.__types[self.program_code]["Core Electives"]+self.__support_link[1]
            self.__area_link = self.__support_link[0]+self.program_type+self.program_code+"_"+self.__types[self.program_code]["Area Electives"]+self.__support_link[1]
            self.__free_link = self.__support_link[0]+self.program_type+self.program_code+"_"+self.__types[self.program_code]["Free Electives"]+self.__support_link[1]
        self.__fens_link = self.__faculty_link[0] + "FC_FENS" + self.__faculty_link[1] + "E" + self.__faculty_link[2]
        self.__fass_link = self.__faculty_link[0] + "FC_FASS" + self.__faculty_link[1] + "S" + self.__faculty_link[2]
        self.__fman_link = self.__faculty_link[0] + "FC_SOM" + self.__faculty_link[1] + "M" + self.__faculty_link[2]
        self.__basic_science_engineering_link = 'https://mysu.sabanciuniv.edu/sr/sites/mysu.sabanciuniv.edu.sr/files/fens_course_catalog_basicscienceengineering_-_ects_okya_giden28.03.2023.pdf'
        self.requirements = []
        self.credits = []
        self.engineering = []
        self.basic_science = []
        self.courses = []
        self.page = ""
        self.core_page = ""
        self.area_page = ""
        self.free_page = ""
        self.fens_page = ""
        self.fass_page = ""
        self.fman_page = ""
        self.pdf = ""
        self.database = []
        self.engineering_db = []
        self.basic_science_db = []
        
    def load_pages(self):
        print("Pages are loading")
        try:
            main_requests = requests.get(self.__main_link)
            core_requests = requests.get(self.__core_link)
            area_requests = requests.get(self.__area_link)
            free_request = requests.get(self.__free_link)
            fens_requst = requests.get(self.__fens_link)
            fass_request = requests.get(self.__fass_link)
            fman_request = requests.get(self.__fman_link)
            if os.path.exists(os.getcwd()+"/basic-science-engineering.pdf") != True:
                pdf_request = requests.get(self.__basic_science_engineering_link)
                with open('basic-science-engineering.pdf', 'wb') as f:
                    f.write(pdf_request.content)
            self.page = BeautifulSoup(main_requests.text, "html.parser").find_all("tr")
            self.core_page = BeautifulSoup(core_requests.text, "html.parser").find_all("tr")
            self.area_page = BeautifulSoup(area_requests.text, "html.parser").find_all("tr")
            self.free_page = BeautifulSoup(free_request.text, "html.parser").find_all("tr")
            self.fens_page = BeautifulSoup(fens_requst.text, "html.parser").find_all("tr")
            self.fass_page = BeautifulSoup(fass_request.text, "html.parser").find_all("tr")
            self.fman_page = BeautifulSoup(fman_request.text, "html.parser").find_all("tr")
        except Exception as e:
            print("Error while getting request " + str(e))


        try:
            pdfFileObj = open('basic-science-engineering.pdf', 'rb')
            reader = PyPDF2.PdfReader(pdfFileObj)
            self.pdf = reader.pages[0].extract_text().split("\n")[15:-4] + reader.pages[1].extract_text().split("\n")[17:] + reader.pages[2].extract_text().split("\n")[17:] + reader.pages[3].extract_text().split("\n")[17:]
            pdfFileObj.close()
        except Exception as e:
            print("Error while getting pdf " + str(e))

        print("Pages are loaded")

    def get_credit_requirement(self):
        print("Credit requirements are adding")
        try:

            credits = []
            data = []
            part = self.page[6:16]
            for i in part:
                for j in i.get_text().strip().split("\n"):
                    data.append(j) 

            value = {}
            for i in range(4,len(data)):
                
                if i%4==0:
                    value["Area"] = data[i]
                elif i%4==1 and data[i].strip() != "-":
                    value["AKTS_Credit"] = int(data[i])
                elif i%4==2 and data[i].strip() != "-":
                    value["SU_Credit"] = int(data[i])
                elif i%4==3:
                    if data[i].strip() != "-":
                        value["Min_Course"] = int(data[i])
                    credits.append(value)

                    value = {} 

            self.credits = credits
            print("Credit requirements are added")
                
        except Exception as e:
            print("Error while getting credit requirements " + str(e))

    def get_university_credit(self):
        print("University courses requirements are adding")
        try:
            uni_courses = []
            part = self.page[20]
            
            for i in part:
        
                self.get_lessons(i)
                for j in i.get_text().strip().split("\n"):
                    if j.strip() != "" and j != '\xa0*\xa0' and j!= "*\xa0":
                        uni_courses.append(j) 
    
                            
            
            courses = []
            value = {}
            for i in range(5,len(uni_courses)):
                if i % 5 == 0:
                    value["Course_Name"] = uni_courses[i]
                elif i%5 == 2:
                    value["AKTS_Credit"] = uni_courses[i]
                elif i%5 == 3:
                    value["SU_Credit"] = uni_courses[i]
                elif i%5 == 4:
                    value["Faculty"] = uni_courses[i]
                    
                    courses.append(value)
                    value = {}

            self.requirements.append({"Area_Name":"University Courses", "Courses": courses})
            print("University courses requirements are added") 

        except Exception as e:
            print("Error while getting university courses requirements " + str(e))

    def get_required_credit(self):
        print("Required courses requirements are adding")
        try:
            part = self.page[65]
            
            required = []
            for i in part:
                self.get_lessons(i)
                for j in i.get_text().strip().split("\n"):
                    if j.strip() != "" and j != '\xa0*\xa0':
                        required.append(j)  


            courses = []
            value = {}
            for i in range(5,len(required)):
                if i % 5 == 0:
                    value["Course_Name"] = required[i]
                    
                elif i%5 == 2:
                    value["AKTS_Credit"] = required[i]
                elif i%5 == 3:
                    value["SU_Credit"] = required[i]
                elif i%5 == 4:
                    value["Faculty"] = required[i]
                    courses.append(value)
                    value = {}
            self.requirements.append({"Area_Name":"Required Courses", "Courses": courses})
            print("Required courses requirements are added")
        except Exception as e:
            print("Error while getting required courses requirements " + str(e))

    def get_core_credit(self):
        print("Core courses requirements are adding")
        try:
            part = self.core_page[3:]
            core = []
            for i in part:
                self.get_lessons(i)
                for j in i.get_text().strip().split("\n"):
                    if j.strip() != "" and j != '\xa0*\xa0' and j!= "*\xa0":
                        core.append(j)  

            courses = []

            value = {}
            for i in range(len(core)):
                if i % 5 == 0:
                    value["Course_Name"] = core[i]
                elif i%5 == 2:
                    value["AKTS_Credit"] = core[i]
                elif i%5 == 3:
                    value["SU_Credit"] = core[i]
                elif i%5 == 4:
                    value["Faculty"] = core[i]
                    courses.append(value)
                    value = {}


            self.requirements.append({"Area_Name":"Core Electives", "Courses": courses})
            print("Core courses requirements are added")
        except Exception as e:
            print("Error while getting core courses requirements " + str(e))

    def get_area_credit(self):
        print("Area courses requirements are adding")
        try:
            part = self.area_page[3:]
            area = []
            for i in part:
                self.get_lessons(i)
                for j in i.get_text().strip().split("\n"):
                    if j.strip() != "" and j != '\xa0*\xa0' and j!= "*\xa0":
                        area.append(j)  

            courses = []
            value = {}
            for i in range(len(area)):
                if i % 5 == 0:
                    value["Course_Name"] = area[i]
                elif i%5 == 2:
                    value["AKTS_Credit"] = area[i]
                elif i%5 == 3:
                    value["SU_Credit"] = area[i]
                elif i%5 == 4:
                    value["Faculty"] = area[i]
                    courses.append(value)
                    value = {}

            self.requirements.append({"Area_Name":"Area Electives", "Courses": courses})
            print("Area courses requirements are added")
        except Exception as e:
            print("Error while getting area courses requirements " + str(e))

    def get_free_credit(self):
        print("Free courses requirements are adding")
        try:
            part = self.free_page[3:]
            free = []
            for i in part:
                self.get_lessons(i)
                for j in i.get_text().strip().split("\n"):
                    if j.strip() != "" and j != '\xa0*\xa0' and j!= "*\xa0":
                        free.append(j)  

            courses = []
            value = {}
            for i in range(len(free)):
                if i % 5 == 0:
                    value["Course_Name"] = free[i]
                elif i%5 == 2:
                    value["AKTS_Credit"] = free[i]
                elif i%5 == 3:
                    value["SU_Credit"] = free[i]
                elif i%5 == 4:
                    value["Faculty"] = free[i]
                    courses.append(value)
                    value = {}

            self.requirements.append({"Area_Name":"Free Electives", "Courses": courses})
            print("Free courses requirements are added")
        except Exception as e:
            print("Error while getting free courses requirements " + str(e))

    def get_faculty_lessons(self):
        print("Faculty courses requirements are adding")
    
        try:
            part = self.fman_page[1:]
     
            fman = []
            for i in part:
                self.get_lessons(i)
                for j in i.get_text().strip().split("\n"):
                    if j.strip() != "" and j != '\xa0*\xa0' and j!= "*\xa0":
                        fman.append(j)  

            courses = []
            value = {}
            
            for i in range(6, len(fman)):
                if i % 5 == 1:
                    value["Course_Name"] = fman[i]
                elif i%5 == 3:
                    value["AKTS_Credit"] = fman[i]
                elif i%5 == 4:
                    value["SU_Credit"] = fman[i]
                elif i%5 == 0:
                    value["Faculty"] = fman[i]
                    courses.append(value)
                    value = {}
    
            

            part = self.fens_page[1:]
            fens = []
            for i in part:
                self.get_lessons(i)
                for j in i.get_text().strip().split("\n"):
                    if j.strip() != "" and j != '\xa0*\xa0' and j!= "*\xa0":
                        fens.append(j)  


            value = {}
 
            for i in range(6, len(fens)):
                if i % 5 == 1:
                    value["Course_Name"] = fens[i]
                elif i%5 == 3:
                    value["AKTS_Credit"] = fens[i]
                elif i%5 == 4:
                    value["SU_Credit"] = fens[i]
                elif i%5 == 0:
                    value["Faculty"] = fens[i]
                    courses.append(value)
                    value = {}


            part = self.fass_page[1:]
            fass = []
            for i in part:
                self.get_lessons(i)
                for j in i.get_text().strip().split("\n"):
                    if j.strip() != "" and j != '\xa0*\xa0' and j!= "*\xa0":
                        fass.append(j)  

       
            value = {}
 
            for i in range(7, len(fass)):
                if i % 6 == 1:
                    value["Course_Name"] = fass[i]
                elif i%6 == 3:
                    value["AKTS_Credit"] = fass[i]
                elif i%6 == 4:
                    value["SU_Credit"] = fass[i]
                elif i%6 == 5:
                    value["Faculty"] = fass[i]
                    courses.append(value)
                    value = {}
        
            self.requirements.append({"Area_Name":"Faculty Courses", "Courses": courses})
            print("Faculty courses requirements are added")
        except Exception as e:
            print("Error while getting faculty courses requirements " + str(e))

    def get_basic_science_engineering_credit(self):
        print("Engineering and basic science courses requirements are adding")
        try:
            basics = []
            engin = []
            for i in range(len(self.pdf)):
                code = self.pdf[i][:self.pdf[i].find(" ",self.pdf[i].find(" ")+1)]
                line = self.pdf[i].split(" ")


                if i == 127:
                    line = self.pdf[i+1].split(" ")
                    basic = line[3]
                    engineer = line[2]
                elif i == 128:
                    continue
                elif i == 143:
                    line = self.pdf[i+1].split(" ")
                    basic = line[4]
                    engineer = line[3]
                elif i == 144:
                    continue
                elif i == 145:
                    line = self.pdf[i+1].split(" ")
                    basic = line[4]
                    engineer = line[3]
                elif i == 146:
                    continue
                elif i == 192:
                    line = self.pdf[i+1].split(" ")
                    basic = line[3]
                    engineer = line[2]
                elif i == 193:
                    continue
                elif i == 227:
                    line = self.pdf[i+1].split(" ")
                    basic = line[6]
                    engineer = line[5]
                elif i == 228:
                    continue
                elif i == 231:
                    line = self.pdf[i+1].split(" ")
                    basic = line[3]
                    engineer = line[2]
                elif i == 232:
                    continue
                elif i == 312:
                    line = self.pdf[i+1].split(" ")
                    basic = [6]
                    engineer = line[5]
                elif i == 313:
                    continue
                elif i == 116:
                    basic = line[15]
                    engineer = line[14]
                else:
                    basic = line[-5]
                    engineer = line[-6]
                
                    
                
                if int(basic[0]) != 0:
                    basics.append({"Course_Name": code, "AKTS_Credit":int(basic[0])})
                if int(engineer[0]) != 0:
                    engin.append({"Course_Name": code, "AKTS_Credit":int(engineer[0])})


            self.requirements.append({"Area_Name":"Engineering", "Courses": engin})
            self.requirements.append({"Area_Name":"Basic Science", "Courses": basics})
        
            print("Engineering and basic science courses requirements are added")
        except Exception as e:
            print("Error while getting engineering and basic science courses requirements " + str(e))

    def get_course_info(self, link):
        request = requests.get(link)
        document = BeautifulSoup(request.text, "html.parser").find_all("table")[0].text.strip()
        document = os.linesep.join([s for s in document.splitlines() if s])

        try:
            name = document[document.find(" ",document.find(" ")+1)+1:document.find("\n")-1]
            code = document[:document.find(" ",document.find(" ")+1)]
            credit = document[document.find("Credit")-2]
            document = get_info( document[document.find("Prerequisite:"):].replace("\n", "*"))
        except Exception as e:
            name = ""
            code = ""
            credit = 0
            document = {}
            print("Error while getting course info " + str(e))
            

        return document, int(credit), name, code

    def get_lessons(self, page):

        
        d = BeautifulSoup(str(page), "html.parser").find_all("a", href=True)
        for j in range(len(d)):
            if j % 2 == 0:
            
                lesson = d[j].get_text()
                if any(d.get('course_code') == lesson for d in self.courses) == False:
                    link = d[j]["href"]
                    info, credit, name, code = self.get_course_info(self.domain+link)
                    
                    if code != "" and any(d.get('course_code') == code for d in self.courses) == False:
                        value = {}
                        
                        print(code, credit)
                        value["course_name"] = name
                        value["course_code"] = code
                        value["credit"] = credit
                        value["condition"] = info
                        self.courses.append(value)

                    
    def get_all(self):
        self.load_course_database()
        self.load_pages()
        self.get_credit_requirement()
        self.get_university_credit()
        self.get_required_credit()
        self.get_core_credit()
        self.get_area_credit()
        self.get_free_credit()
        self.get_basic_science_engineering_credit()
        self.get_faculty_lessons()
        self.save_course_database()

    def print_course_database(self):
        print(self.courses)
    
    def print_credits(self):
        print(self.credits)
    
    def load_course_database(self):
        print("Courses are loading")
        try:
            self.courses = db.find_one({"Courses": { "$exists": "true" }})["Courses"]
        except:
            self.courses = []
            
        print("Courses loaded")
        
    def save_course_database(self):
        print("Courses are saving")
       
        all_requirements = {
             
            "ProgramCode": self.program_code+"_"+self.period,
            "Credits": self.credits,
            "Requirements": self.requirements
            
        }
        courses = {
            "Courses": self.courses
        }



        db.update_one({"ProgramCode":self.program_code+"_"+self.period},{"$set": all_requirements}, upsert=True)
        db.update_one({"Courses": { "$exists": "true" }},{"$set": courses}, upsert=True)

        
        print("Courses saved")

    def __str__(self):
        return str(self.requirements)


class FMANRequirements():

    def __init__(self, program_code, period):
        self.program_type = "BA"
        self.program_code = program_code
        self.period = period
        self.domain = "https://www.sabanciuniv.edu"
        self.__types = {
            "ALL":{"Area Electives":"AEL", "Free Electives":"FEL"}, 
            "MAN":{"Area Electives":"ARE", "Free Electives":"FRE"}
            }
        self.__main_link = "https://www.sabanciuniv.edu/en/prospective-students/degree-detail?SU_DEGREE.p_degree_detail%3fP_TERM="+self.period+"&P_PROGRAM="+self.program_type+self.program_code+"&P_SUBMIT=&P_LANG=EN&P_LEVEL=UG"
        self.__support_link = ["https://www.sabanciuniv.edu/en/prospective-students/degree-detail?SU_DEGREE.p_list_courses?P_TERM="+self.period+"&P_AREA=","&P_PROGRAM="+self.program_type+self.program_code+"&P_LANG=EN&P_LEVEL=UG"]
        self.__faculty_link = ["https://www.sabanciuniv.edu/en/prospective-students/degree-detail?SU_DEGREE.p_list_courses?P_TERM="+self.period+"&P_AREA=","&P_PROGRAM="+self.program_type+self.program_code+"&P_FAC=","&P_LANG=EN&P_LEVEL=UG"]

        if self.program_code not in self.__types.keys():
            self.__area_link = self.__support_link[0]+self.program_type+self.program_code+"_"+self.__types["ALL"]["Area Electives"]+self.__support_link[1]
            self.__free_link = self.__support_link[0]+self.program_type+self.program_code+"_"+self.__types["ALL"]["Free Electives"]+self.__support_link[1]
        else:
            self.__area_link = self.__support_link[0]+self.program_type+self.program_code+"_"+self.__types[self.program_code]["Area Electives"]+self.__support_link[1]
            self.__free_link = self.__support_link[0]+self.program_type+self.program_code+"_"+self.__types[self.program_code]["Free Electives"]+self.__support_link[1]
        self.__fens_link = self.__faculty_link[0] + "FC_FENS" + self.__faculty_link[1] + "E" + self.__faculty_link[2]
        self.__fass_link = self.__faculty_link[0] + "FC_FASS" + self.__faculty_link[1] + "S" + self.__faculty_link[2]
        self.__fman_link = self.__faculty_link[0] + "FC_SOM" + self.__faculty_link[1] + "M" + self.__faculty_link[2]
        self.__basic_science_engineering_link = 'https://mysu.sabanciuniv.edu/sr/sites/mysu.sabanciuniv.edu.sr/files/fens_course_catalog_basicscienceengineering_-_ects_okya_giden28.03.2023.pdf'
        self.requirements = {}
        self.credits = {}
        self.engineering = {}
        self.basic_science = {}
        self.courses = {}
        self.page = ""

        self.area_page = ""
        self.free_page = ""
        self.pdf = ""
        self.database = []
        self.engineering_db = []
        self.basic_science_db = []
        

    def load_pages(self):
        print("Pages are loading")
        try:
            main_requests = requests.get(self.__main_link)
           
            area_requests = requests.get(self.__area_link)
            free_request = requests.get(self.__free_link)

            self.page = BeautifulSoup(main_requests.text, "html.parser").find_all("tr")

            self.area_page = BeautifulSoup(area_requests.text, "html.parser").find_all("tr")
            self.free_page = BeautifulSoup(free_request.text, "html.parser").find_all("tr")
        except Exception as e:
            print("Error while getting request " + str(e))


        print("Pages are loaded")

    def get_credit_requirement(self):
        print("Credit requirements are adding")
        try:

            credits = {}
            data = []
            part = self.page[6:15]
            for i in part:
                for j in i.get_text().strip().split("\n"):
                    data.append(j) 

            value = {}
            for i in range(4,len(data)):
                if i%4==0:
                    key = data[i]
                elif i%4==1 and data[i].strip() != "-":
                    value["AKTS_Credit"] = int(data[i])
                elif i%4==2 and data[i].strip() != "-":
                    value["SU_Credit"] = int(data[i])
                elif i%4==3:
                    if data[i].strip() != "-":
                        value["Min_Course"] = int(data[i])
                    credits[key] = value
                    key = ""
                    value = {} 

            self.credits = credits
            print("Credit requirements are added")
                
        except Exception as e:
            print("Error while getting credit requirements " + str(e))

    def get_university_credit(self):
        print("University courses requirements are adding")
        try:
            uni_courses = []
            part = self.page[18]
            for i in part:
        
                self.get_lessons(i)
                for j in i.get_text().strip().split("\n"):
                    if j.strip() != "" and j != '\xa0*\xa0' and j!= "*\xa0":
                        uni_courses.append(j) 
    
                            
            
            courses = {}
            key = ""
            value = {}
            for i in range(5,len(uni_courses)):
                if i % 5 == 0:
                    key = uni_courses[i]
                        
                elif i%5 == 2:
                    value["AKTS_Credit"] = uni_courses[i]
                elif i%5 == 3:
                    value["SU_Credit"] = uni_courses[i]
                elif i%5 == 4:
                    value["Faculty"] = uni_courses[i]
                    
                    courses[key] = value
                    key = ""
                    value = {}

            self.requirements["University Courses"] = courses
            print("University courses requirements are added") 

        except Exception as e:
            print("Error while getting university courses requirements " + str(e))

    def get_required_credit(self):
        print("Required courses requirements are adding")
        try:
            part = self.page[63]
            required = []
            for i in part:
                self.get_lessons(i)
                for j in i.get_text().strip().split("\n"):
                    if j.strip() != "" and j != '\xa0*\xa0':
                        required.append(j)  


            courses = {}
            key = ""
            value = {}
            for i in range(5,len(required)):
                if i % 5 == 0:
                    key = required[i]
                    
                elif i%5 == 2:
                    value["AKTS_Credit"] = required[i]
                elif i%5 == 3:
                    value["SU_Credit"] = required[i]
                elif i%5 == 4:
                    value["Faculty"] = required[i]
                    courses[key] = value
                    key = ""
                    value = {}

            self.requirements["Required Courses"] = courses
            print("Required courses requirements are added")
        except Exception as e:
            print("Error while getting required courses requirements " + str(e))

    def get_core_credit(self):
        print("Core courses requirements are adding")
        try:
            part = self.page[76]
            core = []
            for i in part:
                self.get_lessons(i)
                for j in i.get_text().strip().split("\n"):
                    if j.strip() != "" and j != '\xa0*\xa0' and j!= "*\xa0":
                        core.append(j)  

            courses = {}
            key = ""
            value = {}
            for i in range(5,len(core)):
                if i % 5 == 0:
                    key = core[i]
                elif i%5 == 2:
                    value["AKTS_Credit"] = core[i]
                elif i%5 == 3:
                    value["SU_Credit"] = core[i]
                elif i%5 == 4:
                    value["Faculty"] = core[i]
                    courses[key] = value
                    key = ""
                    value = {}

            self.requirements["Core Courses"] = courses
            print("Core courses requirements are added")
        except Exception as e:
            print("Error while getting core courses requirements " + str(e))

    def get_area_credit(self):
        print("Area courses requirements are adding")
        try:
            part = self.area_page[3:]
            
            area = []
            for i in part:
                self.get_lessons(i)
                for j in i.get_text().strip().split("\n"):
                    if j.strip() != "" and j != '\xa0*\xa0' and j!= "*\xa0":
                        area.append(j)  

            courses = {}
            key = ""
            value = {}
            for i in range(len(area)):
                if i % 5 == 0:
                    key = area[i]
                elif i%5 == 2:
                    value["AKTS_Credit"] = area[i]
                elif i%5 == 3:
                    value["SU_Credit"] = area[i]
                elif i%5 == 4:
                    value["Faculty"] = area[i]
                    courses[key] = value
                    key = ""
                    value = {}

            self.requirements["Area Courses"] = courses
            print("Area courses requirements are added")
        except Exception as e:
            print("Error while getting area courses requirements " + str(e))

    def get_free_credit(self):
        print("Free courses requirements are adding")
        try:
            part = self.free_page[3:]
            free = []
            for i in part:
                self.get_lessons(i)
                for j in i.get_text().strip().split("\n"):
                    if j.strip() != "" and j != '\xa0*\xa0' and j!= "*\xa0":
                        free.append(j)  

            courses = {}
            key = ""
            value = {}
            for i in range(len(free)):
                if i % 5 == 0:
                    key = free[i]
                elif i%5 == 2:
                    value["AKTS_Credit"] = free[i]
                elif i%5 == 3:
                    value["SU_Credit"] = free[i]
                elif i%5 == 4:
                    value["Faculty"] = free[i]
                    courses[key] = value
                    key = ""
                    value = {}

            self.requirements["Free Courses"] = courses
            print("Free courses requirements are added")
        except Exception as e:
            print("Error while getting free courses requirements " + str(e))

    def get_faculty_lessons(self):
        print("Faculty courses requirements are adding")
    
        try:
            part = self.fman_page[1:]
     
            fman = []
            for i in part:
                self.get_lessons(i)
                for j in i.get_text().strip().split("\n"):
                    if j.strip() != "" and j != '\xa0*\xa0' and j!= "*\xa0":
                        fman.append(j)  

            courses = {}
            key = ""
            value = {}
            
            for i in range(6, len(fman)):
                if i % 5 == 1:
                    key = fman[i]
                elif i%5 == 3:
                    value["AKTS_Credit"] = fman[i]
                elif i%5 == 4:
                    value["SU_Credit"] = fman[i]
                elif i%5 == 0:
                    value["Faculty"] = fman[i]
                    courses[key] = value
                    key = ""
                    value = {}
    
            

            part = self.fens_page[1:]
            fens = []
            for i in part:
                self.get_lessons(i)
                for j in i.get_text().strip().split("\n"):
                    if j.strip() != "" and j != '\xa0*\xa0' and j!= "*\xa0":
                        fens.append(j)  

           
            key = ""
            value = {}
 
            for i in range(6, len(fens)):
                if i % 5 == 1:
                    key = fens[i]
                elif i%5 == 3:
                    value["AKTS_Credit"] = fens[i]
                elif i%5 == 4:
                    value["SU_Credit"] = fens[i]
                elif i%5 == 0:
                    value["Faculty"] = fens[i]
                    courses[key] = value
                    key = ""
                    value = {}


            part = self.fass_page[1:]
            fass = []
            for i in part:
                self.get_lessons(i)
                for j in i.get_text().strip().split("\n"):
                    if j.strip() != "" and j != '\xa0*\xa0' and j!= "*\xa0":
                        fass.append(j)  

       
            key = ""
            value = {}
 
            for i in range(7, len(fass)):
                if i % 6 == 1:
                    key = fass[i]
                elif i%6 == 3:
                    value["AKTS_Credit"] = fass[i]
                elif i%6 == 4:
                    value["SU_Credit"] = fass[i]
                elif i%6 == 5:
                    value["Faculty"] = fass[i]
                    courses[key] = value
                    key = ""
                    value = {}
        
            self.requirements["Faculty Courses"] = courses
            print("Faculty courses requirements are added")
        except Exception as e:
            print("Error while getting faculty courses requirements " + str(e))

    def get_course_info(self, link):
        request = requests.get(link)
        document = BeautifulSoup(request.text, "html.parser").find_all("table")[0].text.strip()
        document = os.linesep.join([s for s in document.splitlines() if s])
        document = document[document.find("Prerequisite:"):].replace("\n", "*")
        return document

    def get_lessons(self, page):
        
        d = BeautifulSoup(str(page), "html.parser").find_all("a", href=True)
        for j in range(len(d)):
            if j % 2 == 0:
                lesson = d[j].get_text()
                print(lesson)
                if lesson not in self.courses.keys():
                    link = d[j]["href"]
                    self.courses[lesson] = self.get_course_info(self.domain+link)

    def get_all(self):
        self.load_course_database()
        self.load_pages()
        self.get_credit_requirement()
        self.get_university_credit()
        self.get_required_credit()
        self.get_core_credit()
        self.get_area_credit()
        self.get_free_credit()
        self.save_course_database()

    def print_course_database(self):
        print(self.courses)
    
    def print_credits(self):
        print(self.credits)
    
    def load_course_database(self):
        print("Courses are loading")
        if os.path.exists(os.getcwd()+"/courses.txt"):
            with open("courses.txt", "r") as file:
                database = file.readlines()
                for i in range(len(database)):
                    data = database[i].split(";")
                    self.database.append(data[0])
                    if data[0] not in self.courses.keys():
                        self.courses[data[0]] = data[1]

        if os.path.exists(os.getcwd()+"/engineering.txt"):
            with open("engineering.txt", "r") as file:
                database = file.readlines()
                for i in range(len(database)):
                    data = database[i].split(":")
                    self.engineering_db.append(data[0])
                    if data[0] not in self.engineering.keys():
                        self.engineering[data[0]] = int(data[1])
        
        if os.path.exists(os.getcwd()+"/basic_science.txt"):
            with open("basic_science.txt", "r") as file:
                database = file.readlines()
                for i in range(len(database)):
                    data = database[i].split(":")
                    self.basic_science_db.append(data[0])
                    if data[0] not in self.basic_science.keys():
                        self.basic_science[data[0]] = int(data[1])
            
            print("Courses loaded")
        
    def save_course_database(self):
        print("Courses are saving")
        with open("courses.txt", "a") as file:
            for i in self.courses.keys():
                if i not in self.database:
                    file.write(i+";"+self.courses[i]+"\n")
        
        with open("engineering.txt", "a") as file:
            for i in self.engineering.keys():
                if i not in self.engineering_db:
                    file.write(i+":"+str(self.engineering[i])+"\n")

        with open("basic_science.txt", "a") as file:
            for i in self.basic_science.keys():
                if i not in self.basic_science_db:
                    file.write(i+":"+str(self.basic_science[i])+"\n")
        print("Courses saved")

    def __str__(self):
        return str(self.requirements)

"""
deneme = FMANRequirements("MAN","201901")
deneme.load_course_database()
deneme.load_pages()
deneme.get_free_credit()
print(deneme)
"""

deneme = FENSRequirements("CS","201901")
deneme.get_all()

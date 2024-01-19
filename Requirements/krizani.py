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
            main_requests = open("SU_DEGREE.p_degree_detail.html", "r").read()
            core_requests = open("Core.html", "r").read()
            area_requests = open("Area.html", "r").read()
            free_request = open("Free.html", "r").read()
            fens_requst = open("Fens.html", "r").read()
            fass_request = open("Fass.html", "r").read()
            fman_request = open("Fman.html", "r").read()
            if os.path.exists(os.getcwd()+"/basic-science-engineering.pdf") != True:
                pdf_request = requests.get(self.__basic_science_engineering_link)
                with open('basic-science-engineering.pdf', 'wb') as f:
                    f.write(pdf_request.content)
            self.page = BeautifulSoup(main_requests, "html.parser").find_all("tr")
            self.core_page = BeautifulSoup(core_requests, "html.parser").find_all("tr")
            self.area_page = BeautifulSoup(area_requests, "html.parser").find_all("tr")
            self.free_page = BeautifulSoup(free_request, "html.parser").find_all("tr")
            self.fens_page = BeautifulSoup(fens_requst, "html.parser").find_all("tr")
            self.fass_page = BeautifulSoup(fass_request, "html.parser").find_all("tr")
            self.fman_page = BeautifulSoup(fman_request, "html.parser").find_all("tr")
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
                    info, credit, name, code = self.get_course_info(link)
                    
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
    
requirement = FENSRequirements("CS", "201901")
requirement.load_pages()
requirement.get_all()
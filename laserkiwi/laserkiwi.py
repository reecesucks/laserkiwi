# import pygame
import pygame
import math
import random
import time
from pygame.locals import *

WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GREY = (10, 10, 10)
BROWN = (255,  248, 220)
RED = (255, 0, 0)
YELLOW = (255, 255, 0)
GREEN = (0, 255, 0)

##
kiwi_speed = 4
RADIUS = 28.6
ADJ = 23
OPP = 17
level = 1
bullet_speed = 10
covid_speed = 2
boat_speed = 1
damage = 1
covid_distance = 150
covid_max_ammount = 5
score = 0
small_covid_points = 13
variant_shot_points = 7
level_length = 35
level_start_time = 0
variants_level = 2
big_covid_level = 3
variants_max_ammount = 2
big_covid_max_ammount = 1
bg_music = ['bg_music_TheBeths.mp3', 'background_music.mp3']

welcome_message = False
welcome_text_time = ""
welcome_text_1 = "Kia ora koutou. Wuhan has been overun with a new form"
welcome_text_2 = "of pnuemonia. It is now spreading overseas. We are"
welcome_text_3 = "expecting it on our shores imminently. Our team of"
welcome_text_4 = "5 million is not enough. We need to mobilize Laser Kiwi."
welcome_text_5 = "Destroy the invading covid."
welcome_text_6 = "Vacinate infected cities to heal Aoteara."
welcome_text_7 = "Wash your hands. Scan your QR codes. Stay home if you"
welcome_text_8 = "are unwell."
welcome_text_9 = "Defend Aotearoa"

# initialize game engine
pygame.init()

window_width=1212
window_height=912

animation_increment=10
clock_tick_rate=20

# Open a window
size = (window_width, window_height)
screen = pygame.display.set_mode(size)

# Set title to the window
pygame.display.set_caption("Laser Kiwi")

dead=False

clock = pygame.time.Clock()


img = pygame.image.load("laserkiwi.png").convert()
laser = pygame.image.load("laser.png").convert()

## CREATE SIDE BAR WITH STATS AND JUNK
pygame.draw.rect(screen, GREY, [0, 0, 300, 912])
pygame.draw.rect(screen, WHITE, [10, 10, 280, 892])


##SET UP FONT
pygame.font.init()
font_path = 'RetroGaming.ttf' # or wherever your font file is
size = 24
retro_font = pygame.font.Font(font_path, size)
defao = retro_font.render('Defend Aotearoa', True, BLACK)
screen.blit(defao, (25, 20))
size = 18
retro_font = pygame.font.Font(font_path, size)
health_heading = retro_font.render('Health', True, BLACK)
screen.blit(health_heading, (20, 50))
score_heading = retro_font.render('0', True, BLACK)
screen.blit(score_heading, (20, 80))
#pygame.draw.rect(screen, RED, [100, 50, 180, 20])



## SETT BACKGROUND
background_image = pygame.image.load("water.png").convert()
picture = pygame.image.load("water.png")
picture = pygame.transform.scale(picture, (912, 912))


#game_break_background_image = pygame.image.load("Welcome_level_break_bg.png").convert()
game_break_background_image = pygame.image.load("cov_update_bg.jpg").convert()
#game_break_background_image = pygame.transform.scale(game_break_background_image, (912, 912))

factory = pygame.image.load("factory.png")

covid_stripes = pygame.image.load("covid_stripes.png").convert()
ashley = pygame.image.load("ashley.png")
#ashley = pygame.transform.scale(picture, (912, 912))


class Health_Bar():
    def __init__(self):
        self.health = 500
    def colour(self):
        if(self.health > 50):
            return GREEN
        elif(self.health > 25):
            return YELLOW
        else:
            return RED

class Aotearoa(pygame.sprite.Sprite):
    def __init__(self):
        #pygame.sprite.Sprite.__init__()
        super().__init__()
        self.image = pygame.Surface([10,15])
        self.image = pygame.image.load("NZpixel.png").convert_alpha()
        self.rect = self.image.get_rect()
        self.mask = pygame.mask.from_surface(self.image)
    def draw(self, screen):
        screen.blit(self.image, self.rect)

class City(pygame.sprite.Sprite):
    def __init__(self, name, city_image, infected_image, x, y):
        super().__init__()
        self.image = pygame.image.load(city_image).convert_alpha()
        self.rect = self.image.get_rect()
        self.mask = pygame.mask.from_surface(self.image)
        self.city_image = pygame.image.load(city_image).convert_alpha()
        self.infected_image = pygame.image.load(infected_image).convert_alpha()
        self.rect.x = x
        self.rect.y = y
        self.name = name
        self.infected = False
        self.vaccinated = False

    def draw(self, screen):
        screen.blit(self.image, self.rect)

class Covid(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.image.load("smallcovid.png").convert_alpha()
        self.rect = self.image.get_rect()
        self.angle = 0
        self.mask = pygame.mask.from_surface(self.image)
        self.small_amount = 0
        self.big_amount = 0
        self.variant = False
        self.big = False
        self.city = city_list[random.randint(0,7)]
        self.flag = Flag()
        self.hit_count = 0
    def walk(self):
        covid.rect.x = covid.rect.x + random.randint(-1,1)
        covid.rect.y = covid.rect.y + random.randint(-1,1)

        if(covid.city == "Dunedin"):
            if(covid.rect.x < 701):
                covid.rect.x += covid_speed
            else:
                covid.rect.x -= covid_speed
            if(covid.rect.y < 642):
                covid.rect.y += covid_speed
            else:
                covid.rect.y -= covid_speed
        elif(covid.city == "Queenstown"):
            if(covid.rect.x < 635):
                covid.rect.x += covid_speed
            else:
                covid.rect.x -= covid_speed
            if(covid.rect.y < 600):
                covid.rect.y += covid_speed
            else:
                covid.rect.y -= covid_speed
        elif(covid.city == "Christchurch"):
            if(covid.rect.x < 760):
                covid.rect.x += covid_speed
            else:
                covid.rect.x -= covid_speed
            if(covid.rect.y < 535):
                covid.rect.y += covid_speed
            else:
                covid.rect.y -= covid_speed
        elif(covid.city == "Nelson"):
            if(covid.rect.x < 771):
                covid.rect.x += covid_speed
            else:
                covid.rect.x -= covid_speed
            if(covid.rect.y < 430):
                covid.rect.y += covid_speed
            else:
                covid.rect.y -= covid_speed
        elif(covid.city == "Wellington"):
            if(covid.rect.x < 825):
                covid.rect.x += covid_speed
            else:
                covid.rect.x -= covid_speed
            if(covid.rect.y < 440):
                covid.rect.y += covid_speed
            else:
                covid.rect.y -= covid_speed
        elif(covid.city == "Palmerston North"):
            if(covid.rect.x < 865):
                covid.rect.x += covid_speed
            else:
                covid.rect.x -= covid_speed
            if(covid.rect.y < 400):
                covid.rect.y += covid_speed
            else:
                covid.rect.y -= covid_speed
        elif(covid.city == "Gisborne"):
            if(covid.rect.x < 939):
                covid.rect.x += covid_speed
            else:
                covid.rect.x -= covid_speed
            if(covid.rect.y < 333):
                covid.rect.y += covid_speed
            else:
                covid.rect.y -= covid_speed
        elif(covid.city == "Auckland"):
            if(covid.rect.x < 786):
                covid.rect.x += covid_speed
            else:
                covid.rect.x -= covid_speed
            if(covid.rect.y < 230):
                covid.rect.y += covid_speed
            else:
                covid.rect.y -= covid_speed

        if(covid.variant):
            covid.flag.rect.x = covid.rect.x
            covid.flag.rect.y = covid.rect.y

    def draw(self, screen):
        screen.blit(self.image, self.rect)

class Flag(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        num = random.randint(1, 5)
        if num == 1:
            self.image = pygame.image.load("eng_flag.png")
        elif num == 2:
            self.image = pygame.image.load("ind_flag.png")
        elif num == 3:
            self.image = pygame.image.load("brz_flag.png")
        else:
            self.image = pygame.image.load("usa_flag.png")


        self.rect = self.image.get_rect()
        self.rect.x = -50
        self.rect.y = -50
    def draw(self, screen):
        screen.blit(self.image, self.rect)

class LaserKiwi(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface([10,15])
        self.image = pygame.image.load("laserkiwi.png").convert_alpha()
        self.rect = self.image.get_rect()
        self.angle = 0
        self.radius = RADIUS
        self.covid_kill_count = 0
        self.score = 0
        self.level = 1
        self.carrying_vaccine = False

    def moveRight(self, pixels):
        if(self.rect.x + self.rect.width < 1213):
            self.rect.x += pixels

    def moveLeft(self, pixels):
        if(self.rect.x > 300):
            self.rect.x -= pixels

    def moveUp(self, pixels):
        if(self.rect.y >= -5):
            self.rect.y -= pixels

    def moveDown(self, pixels):
        if(self.rect.y + self.rect.height <= 777):
            self.rect.y += pixels

    def rotateLeft(self):
        orig_rect = self.image.get_rect()
        rot_image = pygame.transform.rotate(img, self.angle)
        rot_rect = orig_rect.copy()
        rot_rect.center = rot_image.get_rect().center
        rot_image = rot_image.subsurface(rot_rect).copy()
        self.image = rot_image
        self.angle +=8

    def rotateRight(self):
        #mx, my = self.image.get_rect()[2], self.image.get_rect()[3]
        orig_rect = self.image.get_rect()
        rot_image = pygame.transform.rotate(img, self.angle)
        rot_rect = orig_rect.copy()
        rot_rect.center = rot_image.get_rect().center
        rot_image = rot_image.subsurface(rot_rect).copy()
        self.image = rot_image
        self.angle -=8

        #covid.rect.x = laserkiwi.rect.x + laserkiwi.rect.width/2 - (covid.rect.width / 2) + RADIUS * math.sin(math.radians(laserkiwi.angle))
        #covid.rect.y = laserkiwi.rect.y + laserkiwi.rect.height/2 - (covid.rect.height / 2) + RADIUS * math.cos(math.radians(laserkiwi.angle))
        #+ laserkiwi.radius * (math.sin(math.radians(laserkiwi.angle))) - (covid.rect.width / 2)

    def laserBeam(self):
        mx, my = self.image.get_rect()[2], self.image.get_rect()[3]
        bullet = Bullet()
        bullet.rect.x = laserkiwi.rect.x + laserkiwi.rect.width/2 - (bullet.rect.width / 2) # + RADIUS * math.sin(math.radians(laserkiwi.angle))
        bullet.rect.y = laserkiwi.rect.y + laserkiwi.rect.height/2 - (bullet.rect.height / 2) #+ RADIUS * math.cos(math.radians(laserkiwi.angle))
        all_sprites_list.add(bullet)
        bullets.append(bullet)

    def getAngle(self):
        return self.angle

class Bullet(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.image.load("laser.png").convert_alpha()
        self.rect = self.image.get_rect()
        self.mask = pygame.mask.from_surface(self.image)
        self.start = clock.tick()
        self.angle = LaserKiwi.getAngle(laserkiwi)
        self.shot = True
        self.bulletSpeed = 5


        self.image = pygame.transform.rotate(laser, self.angle).convert_alpha()

class Boat(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.image.load("boat.png").convert_alpha()
        self.rect = self.image.get_rect()
        self.mask = pygame.mask.from_surface(self.image)
    def draw(self, screen):
        screen.blit(self.image, self.rect)

class Vaccine(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.image.load("vaccine.png").convert_alpha()
        self.rect = self.image.get_rect()
        self.mask = pygame.mask.from_surface(self.image)
        self.delivered = False
        self.on_boat = True
        self.count = 0
    def draw(self, screen):
        screen.blit(self.image, self.rect)

aotearoa = Aotearoa()
aotearoa.rect.x = 570
aotearoa.rect.y = 130
city_list = ["Auckland", "Gisborne", "Wellington", "Palmerston North", "Christchurch", "Dunedin", "Queenstown", "Nelson"]

cities =[]
auckland = City("Auckland","Auckland.png", "Infected_auckland.png", 786, 230)
#auckland.image = pygame.image.load("Auckland.png").convert_alpha()
#auckland.city_image = pygame.image.load("Auckland.png").convert_alpha()
#auckland.infected_image = pygame.image.load("Infected_auckland.png").convert_alpha()
#auckland.rect.x = 786
#auckland.rect.y = 230
wellington = City("Wellington", "beehive.png", "infectedbeehive.png", 810, 410)
christchurch = City("Christchurch", "christchurch.png", "christchurchinfected.png", 740, 525)
gisborne = City("Gisborne", "gisborne.png", "infectedgisborne.png", 909, 303)
palmerston = City("Palmerston North", "palmy.png", "infectedpalmy.png", 835, 380)
dunedin = City("Dunedin", "dunedin.png", "dunedininfected.png", 685, 612)
queenstown = City("Queenstown", "queenstown.png", "infectedqueenstown.png", 600, 570)
nelson = City("Nelson", "nelson.png", "nelsoninfected.png", 740, 400)
cities.append(auckland)
cities.append(wellington)
cities.append(christchurch)
cities.append(gisborne)
cities.append(palmerston)
cities.append(dunedin)
cities.append(queenstown)
cities.append(nelson)


health_bar = Health_Bar()
pygame.draw.rect(screen, RED, [100, 50, health_bar.health *180 / 100, 20])

boat = Boat()
boat.rect.x = 160
boat.rect.y = 370
vaccine = Vaccine()
vaccine.rect.x = 240
vaccine.rect.y = 390

laserkiwi = LaserKiwi()
laserkiwi.rect.x = 736
laserkiwi.rect.y = 436

covid_list = []
flag_list = []

bullets = []

all_sprites_list = pygame.sprite.Group()
#all_sprites_list.add(aotearoa)
all_sprites_list.add(laserkiwi)
#all_sprites_list.add(bullets)

def set_battle_screen():
    pygame.draw.rect(screen, GREY, [0, 0, 300, 912])
    pygame.draw.rect(screen, WHITE, [10, 10, 280, 892])
    #pygame.draw.rect(screen, WHITE, [100, 50, 180, 20])
    screen.blit(defao, (25, 20))
    screen.blit(health_heading, (20, 50))
    pygame.draw.rect(screen, health_bar.colour(), [100, 50, (health_bar.health * 180) / 500, 20])


    size = 18
    retro_font = pygame.font.Font(font_path, size)
    score_heading = retro_font.render('Score ' + str(laserkiwi.score), True, BLACK)
    kill_count_heading = retro_font.render('Covid Destoyed ' + str(laserkiwi.covid_kill_count), True, BLACK)
    vaccination_count = retro_font.render('Vaccines Distrubted ' + str(vaccine.count), True, BLACK)
    screen.blit(score_heading, (20, 80))
    screen.blit(kill_count_heading, (20, 100))
    screen.blit(vaccination_count, (20, 120))
    screen.blit(picture, [300, 0])
    aotearoa.draw(screen)

def draw_cities():
    for city in cities:
        if city.infected:
            city.image = city.infected_image
        if city.infected == False:
            city.image = city.city_image
        city.draw(screen)
        for covid in covid_list:
            if pygame.sprite.collide_mask(city, covid) and covid.city == city.name:
                city.infected = True

        if(city.infected == True and city.vaccinated == False):
            city.image = city.infected_image

        if pygame.sprite.collide_mask(laserkiwi, city):
            if city.infected and laserkiwi.carrying_vaccine:
                vaccine.count +=1
                city.infected = False
                laserkiwi.carrying_vaccine = False
                vaccine.rect.x = 200
                vaccine.rect.y = 350

def set_covid():
    count = covid_distance
    global level
    for num in range(covid_max_ammount):
        add_covid(num)
        count += count/2
        level = level + 1

    if (laserkiwi.level >= variants_level):
        for num in range(variants_max_ammount):
            add_covid(num)
            covid_list[len(covid_list)-1].variant = True
            #covid_list[len(covid_list)-1].hit_count = 3
            flag = Flag()
            covid_list[len(covid_list)-1].flag = flag
    if (laserkiwi.level >= big_covid_level):
        for num in range(big_covid_max_ammount):
            add_covid(num)
            covid_list[len(covid_list)-1].big = True
            #covid_list[len(covid_list)-1].hit_count = 3
            #flag = Flag()
            big_covid = pygame.image.load("smallcovid.png")
            big_covid = pygame.transform.scale(big_covid, (150, 150))
            covid_list[len(covid_list)-1].image = big_covid
            covid_list[len(covid_list)-1].mask = pygame.mask.from_surface(covid_list[len(covid_list)-1].image)


def add_covid(multiplier):
    count = covid_distance * multiplier
    covid = Covid()
    if random.randint(0, 2) == 1:
        covid.rect.y = random.randint(-20, 0) - count
    else:
        covid.rect.y = random.randint(720, 740) + count
    if random.randint(0, 2) == 1:
        covid.rect.x = random.randint(280, 300) - count
    else:
        covid.rect.x = random.randint(750, 770) + count
    covid_list.append(covid)
    all_sprites_list.add(covid)

def move_bullets():
    for bullet in bullets:
        bullet.angle = bullet.angle % 360
        if bullet.rect.x < 310 or bullet.rect.x > 1235 or bullet.rect.y < -20 or bullet.rect.y > 945:
            bullet.rect.x = -9999
            bullet.rect.y = -9999
            bullets.remove(bullet)
        bullet.rect.x -= bullet_speed * math.cos(math.radians(bullet.angle))
        bullet.rect.y += bullet_speed * math.sin(math.radians(bullet.angle))
        #shot = True
        for covid in covid_list:
            if pygame.sprite.collide_mask(bullet, covid):

                if((not covid.big and (covid.variant == False  or covid.hit_count >= 2)) or (covid.big and covid.hit_count >= 4)):
                    covid_list.remove(covid)
                    all_sprites_list.remove(covid)
                    laserkiwi.score += small_covid_points
                    laserkiwi.covid_kill_count += 1
                    covid.rect.x = 9999
                    covid.rect.y = 9999
                    bullet.rect.x = -9999
                    bullet.rect.y = -9999

                if(covid.variant == True and bullet.shot):
                    laserkiwi.score += variant_shot_points
                    covid.hit_count +=1
                    bullet.shot = False
                    bullet.rect.x = -9999
                    bullet.rect.y = -9999

                if(covid.big == True and bullet.shot):
                    laserkiwi.score +=  variant_shot_points
                    covid.hit_count +=1
                    bullet.shot = False
                    bullet.rect.x = -9999
                    bullet.rect.y = -9999

def move_kiwi():
    if keys[pygame.K_LEFT]:
        laserkiwi.moveLeft(kiwi_speed)
    if keys[pygame.K_RIGHT]:
        laserkiwi.moveRight(kiwi_speed)
    if keys[pygame.K_UP]:
        laserkiwi.moveUp(kiwi_speed)
    if keys[pygame.K_DOWN]:
        laserkiwi.moveDown(kiwi_speed)
    if keys[pygame.K_d]:
        laserkiwi.rotateRight()
    if keys[pygame.K_a]:
        laserkiwi.rotateLeft()

def start_message():
    #pygame.mixer.music.load("background_music.mp3")
    #pygame.mixer.music.play(-1,0.0)
    start_time = time.time()
    set_battle_screen()
    aotearoa.draw(screen)

    font_path = 'RetroGaming.ttf'
    size = 72
    retro_font = pygame.font.Font(font_path, size)
    defend_message = retro_font.render('Defend Aotearoa', True, BLACK)
    size =69
    retro_font = pygame.font.Font(font_path, size)
    level_message = retro_font.render("Level " + str(laserkiwi.level), True, BLACK)
    screen.blit(defend_message, (390, 75))
    screen.blit(level_message, (620, 675))
    while time.time() - start_time < 1:

        pygame.display.flip()
        clock.tick(clock_tick_rate)

def end_level_message():
    laserkiwi.level += 1
    pygame.mixer.music.load("CovidAnnouncement.mp3")
    pygame.mixer.music.play(-1,0.0)
    global intro
    intro = False
    start_time = time.time()
    while time.time() - start_time < 1:
        break
    start_time = time.time()
    set_battle_screen()
    boat.rect.x = 200
    boat.rect.y = 350
    vaccine.on_boat = True
    laserkiwi.carrying_vaccine = False
    vaccine.delivered = False
    #aotearoa.draw(screen)
    screen.blit(game_break_background_image, [300, 0])

    end_level_message = "1:00 pm Covid Update:"
    message_1 =""

    size = 20
    font_path = 'RetroGaming.ttf'
    retro_font = pygame.font.Font(font_path, size)

    for character in end_level_message:
        start_time = time.time()
        message_1 += character
        while time.time() - start_time < .1:
            warning_1 = retro_font.render(message_1, True, BLACK)
            screen.blit(warning_1, (430, 500))
            pygame.display.flip()
            clock.tick(clock_tick_rate)

    end_level_message = "Level " + str(laserkiwi.level) + " completed. Prepare for level " +  str(laserkiwi.level + 1)
    size = 18
    font_path = 'RetroGaming.ttf'
    retro_font = pygame.font.Font(font_path, size)
    message_2 = ""
    for character in end_level_message:
        start_time = time.time()
        message_2 += character
        while time.time() - start_time < .1:
            warning_1 = retro_font.render(message_2, True, BLACK)
            screen.blit(warning_1, (430, 525))
            pygame.display.flip()
            clock.tick(clock_tick_rate)
    message_3 = ""
    if(laserkiwi.level >= variants_level):

        end_level_message = "Other countries are reporting mutations in Covid-19"
        size = 18
        font_path = 'RetroGaming.ttf'
        retro_font = pygame.font.Font(font_path, size)
        for character in end_level_message:
            start_time = time.time()
            message_3 += character
            while time.time() - start_time < .1:
                warning_3 = retro_font.render(message_3, True, BLACK)
                screen.blit(warning_3, (430, 545))
                pygame.display.flip()
                clock.tick(clock_tick_rate)



    while time.time() - start_time < 1:
        pygame.display.flip()
        clock.tick(clock_tick_rate)

    set_covid()
    pygame.mixer.music.load(bg_music[random.randint(0,1)])
    pygame.mixer.music.play(-1,0.0)


def start_game():
    pygame.mixer.music.load("CovidAnnouncement.mp3")
    pygame.mixer.music.play(-1,0.0)
    start_time = time.time()
    #set_battle_screen()
    screen.blit(game_break_background_image, [300, 0])
    size = 17
    retro_font = pygame.font.Font(font_path, size)
    retro_font_1 = pygame.font.Font(font_path, 42)
    message_1 = ""
    message_2 = ""
    message_3 = ""
    message_4 = ""
    message_5 = ""
    message_6 = ""
    message_7 = ""
    message_8 = ""
    message_9 = ""
    for character in welcome_text_1:
        start_time = time.time()
        message_1 += character
        while time.time() - start_time < .1:
            warning_1 = retro_font.render(message_1, True, BLACK)
            screen.blit(warning_1, (430, 500))
            pygame.display.flip()
            clock.tick(clock_tick_rate)
    for character in welcome_text_2:
        start_time = time.time()
        message_2 += character
        while time.time() - start_time < .1:
            warning_2 = retro_font.render(message_2, True, BLACK)
            screen.blit(warning_1, (430, 500))
            screen.blit(warning_2, (430, 520))
            pygame.display.flip()
            clock.tick(clock_tick_rate)
    for character in welcome_text_3:
        start_time = time.time()
        message_3 += character
        while time.time() - start_time < .1:
            warning_3 = retro_font.render(message_3, True, BLACK)
            screen.blit(warning_1, (430, 500))
            screen.blit(warning_2, (430, 520))
            screen.blit(warning_3, (430, 540))
            pygame.display.flip()
            clock.tick(clock_tick_rate)
    for character in welcome_text_4:
        start_time = time.time()
        message_4 += character
        while time.time() - start_time < .1:
            warning_4 = retro_font.render(message_4, True, BLACK)
            screen.blit(warning_1, (430, 500))
            screen.blit(warning_2, (430, 520))
            screen.blit(warning_3, (430, 540))
            screen.blit(warning_4, (430, 560))
            pygame.display.flip()
            clock.tick(clock_tick_rate)
    for character in welcome_text_5:
        start_time = time.time()
        message_5 += character
        while time.time() - start_time < .1:
            warning_5 = retro_font.render(message_5, True, BLACK)
            screen.blit(warning_1, (430, 500))
            screen.blit(warning_2, (430, 520))
            screen.blit(warning_3, (430, 540))
            screen.blit(warning_4, (430, 560))
            screen.blit(warning_5, (430, 580))
            pygame.display.flip()
            clock.tick(clock_tick_rate)
    for character in welcome_text_6:
        start_time = time.time()
        message_6 += character
        while time.time() - start_time < .1:
            warning_6 = retro_font.render(message_6, True, BLACK)
            screen.blit(warning_1, (430, 500))
            screen.blit(warning_2, (430, 520))
            screen.blit(warning_3, (430, 540))
            screen.blit(warning_4, (430, 560))
            screen.blit(warning_5, (430, 580))
            screen.blit(warning_6, (430, 600))
            pygame.display.flip()
            clock.tick(clock_tick_rate)
    for character in welcome_text_7:
        start_time = time.time()
        message_7 += character
        while time.time() - start_time < .1:
            warning_7 = retro_font.render(message_7, True, BLACK)
            screen.blit(warning_1, (430, 500))
            screen.blit(warning_2, (430, 520))
            screen.blit(warning_3, (430, 540))
            screen.blit(warning_4, (430, 560))
            screen.blit(warning_5, (430, 580))
            screen.blit(warning_6, (430, 600))
            screen.blit(warning_7, (430, 620))
            pygame.display.flip()
            clock.tick(clock_tick_rate)
    for character in welcome_text_8:
        start_time = time.time()
        message_8 += character
        while time.time() - start_time < .1:
            warning_8 = retro_font.render(message_8, True, BLACK)
            screen.blit(warning_1, (430, 500))
            screen.blit(warning_2, (430, 520))
            screen.blit(warning_3, (430, 540))
            screen.blit(warning_4, (430, 560))
            screen.blit(warning_5, (430, 580))
            screen.blit(warning_6, (430, 600))
            screen.blit(warning_7, (430, 620))
            screen.blit(warning_8, (430, 640))
            pygame.display.flip()
            clock.tick(clock_tick_rate)
    for character in welcome_text_9:
        start_time = time.time()
        message_9 += character
        while time.time() - start_time < .1:
            warning_9 = retro_font_1.render(message_9, True, BLACK)
            screen.blit(warning_1, (430, 500))
            screen.blit(warning_2, (430, 520))
            screen.blit(warning_3, (430, 540))
            screen.blit(warning_4, (430, 560))
            screen.blit(warning_5, (430, 580))
            screen.blit(warning_6, (430, 600))
            screen.blit(warning_7, (430, 620))
            screen.blit(warning_8, (430, 640))
            screen.blit(warning_9, (530, 660))
            pygame.display.flip()
            clock.tick(clock_tick_rate)
    start_time = time.time()
    while time.time() - start_time < 3:
        pygame.display.flip()
        clock.tick(clock_tick_rate)
    pygame.mixer.music.load(bg_music[random.randint(0,1)])
    pygame.mixer.music.play(-1,0.0)


def send_boat():
    if not vaccine.delivered and boat.rect.x < 550  and not laserkiwi.carrying_vaccine:
        boat.rect.x += boat_speed
    if vaccine.delivered and boat.rect.x > 200:
        boat.rect.x -= boat_speed
    #if(boat.rect.x < 550 and not laserkiwi.carrying_vaccine):
        #vaccine.rect.x += boat_speed
    if pygame.sprite.collide_mask(boat, vaccine) and not laserkiwi.carrying_vaccine:
        vaccine.delivered = False
        vaccine.on_boat = True

    boat.draw(screen)

def set_vaccine():
    if(vaccine.on_boat):
        vaccine.rect.x = boat.rect.x + 20
        vaccine.rect.y = boat.rect.y + 20

    if(laserkiwi.carrying_vaccine):
        vaccine.rect.x = laserkiwi.rect.x
        vaccine.rect.y = laserkiwi.rect.y
    vaccine.draw(screen)
    #else:
    #    vaccine.draw(screen)
def set_message_box():
    pygame.draw.rect(screen, BLACK, [0, 540, 300, 300])
    screen.blit(covid_stripes, [0, 540])
    infected_city_message = ""
    count = 0
    infected_cities = []
    for city in cities:
        if (city.infected == True):
            infected_cities.append(city.name)

    #if(infected_city_message != ""):
    x = 20
    if(len(infected_cities) > 0):
        screen.blit(ashley, [0, 540])
        size = 18
        retro_font = pygame.font.Font(font_path, size)
        city_warning = retro_font.render("Infected Cities:", True, BLACK)
        screen.blit(city_warning, (115, 540))
        size = 16
        retro_font = pygame.font.Font(font_path, size)
        for city in cities:
            if city.infected:
                city_warning = retro_font.render(city.name, True, BLACK)
                screen.blit(city_warning, (125, 540 + x))
                x += 15
        size = 17
        retro_font = pygame.font.Font(font_path, size)
        vaccinate_warning = retro_font.render("Vaccinate Now!", True, BLACK)
        screen.blit(vaccinate_warning, (128, 540 + x +10))

def set_health_bar():
    covid_free = True
    for city in cities:
        if city.infected:
            covid_free = False
    if(health_bar.health < 500 and covid_free ):
        health_bar.health += 1.1


set_covid()
intro = False
boat_sent = False


while(dead==False):



    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            dead = True
        elif event.type == pygame.KEYUP and event.key == pygame.K_SPACE:
                laserkiwi.laserBeam()

    keys = pygame.key.get_pressed()
    move_kiwi()

    if(len(covid_list) == 0):
        if(time.time() - level_start_time > level_length):
            for bullet in bullets:
                bullets.remove(bullet)
                bullet.rect.x = 9999
                bullet.rect.y = 9999

            laserkiwi.rect.x = 736
            laserkiwi.rect.y = 436
            ##RESET KIWI ANGLE AND IMAGE
            ##laserkiwi.angle = 0

            end_level_message()
        else:
            set_covid()

    move_bullets()

    for covid in covid_list:
        covid.walk()
        covid.flag.draw(screen)
        if pygame.sprite.collide_mask(covid, aotearoa):
            health_bar.health -= damage


    set_health_bar()

    set_battle_screen()
    draw_cities()

    if(time.time() - level_start_time > 8):
        send_boat()
        set_vaccine()


    all_sprites_list.update()
    all_sprites_list.draw(screen)
    if(time.time() - level_start_time > 15):
        set_vaccine()

    if (intro == False):
        start_message()
        intro = True
        level_start_time = time.time()



    if pygame.sprite.collide_mask(laserkiwi, vaccine):
        laserkiwi.carrying_vaccine = True
        vaccine.on_boat = False
        vaccine.delivered = True



    screen.blit(factory, [50, 195])

    set_message_box()

    for covid in covid_list:
        covid.flag.draw(screen)



    pygame.display.flip()
    clock.tick(clock_tick_rate)

    if(not welcome_message):
        start_game()
        welcome_message = True


    ### FINISH CHANGING SCORE TO LASERKIWI.SCORE

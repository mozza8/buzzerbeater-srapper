from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import re
import tempfile


def get_drvier():
  # Set options to make browsing easier
  options = webdriver.ChromeOptions()
  options.add_argument("--headless")
  options.add_argument("--no-sandbox")
  options.add_argument("--disable-dev-shm-usage")
  options.add_argument("disable-infobars")
  options.add_argument("start-maximized")
  options.add_argument("disable-dev-shm-usage")
  options.add_argument("no-sandbox")
  options.add_experimental_option("excludeSwitches", ["enable-automation"])
  options.add_argument("disable-blink-features=AutomationControlled")

  # Create a temp profile directory for Chrome
  user_data_dir = tempfile.mkdtemp()
  options.add_argument(f"--user-data-dir={user_data_dir}")

  driver = webdriver.Chrome(options=options)
  driver.get("https://www.buzzerbeater.com/default.aspx?lang=sl-SI")
  return driver

def main():
  driver = get_drvier()
  driver.find_element(by="xpath", value="/html/body/form/div[3]/header/div/div/div[2]/div/div[1]/a").click()
  time.sleep(2)
  driver.find_element(by="id", value="txtLoginUserName").send_keys("moza8")
  time.sleep(2)
  driver.find_element(by="id", value="txtLoginPassword").send_keys("deeppurple8" + Keys.RETURN)
  time.sleep(5)
  driver.find_element(by='xpath', value='/html/body/div[6]/div[2]/div[2]/div[2]/div[2]/button[1]').click()
  time.sleep(3)
  driver.find_element(by="id", value="menuTransferList").click()
  time.sleep(2)
  driver.find_element(by="id", value="cphContent_btnSearch").click()
  time.sleep(2)
  driver.find_element(by="id", value="cphContent_btnNextPage").click()
  time.sleep(2)
  players = []

  def getPlayerData(x, id):
    igrac = {}
    p = x.index('plača:')
    placa = ''
    if x[p+3].isnumeric():
      placa = x[p+2] + x[p+3]
    else:
      placa = x[p+2]

    s = x.index('Starost:')
    starost = x[s + 1]
    v = x.index('Višina:')
    visina = x[v + 3]
    po = x.index('Potencial:')
    potencial = x[po + 1]

    igrac['id'] = id
    igrac['placa'] = placa
    igrac['starost'] = starost
    igrac['visina'] = visina
    igrac['potencial'] = potencial
    return igrac

  def getPlayerStats(igrac, x):
    sut = driver.find_element(by='id', value=f'cphContent_rptListedPlayers_SkillTable_{x}_sdJumpShot_{x}_linkDen_{x}')
    igrac['metIzSkoka'] = sut.get_attribute('title')

    trice = driver.find_element(by='id',
                                value=f'cphContent_rptListedPlayers_SkillTable_{x}_sdJumpRange_{x}_linkDen_{x}')
    igrac['razdaljaMeta'] = trice.get_attribute('title')

    zunajna = driver.find_element(by='id',
                                  value=f'cphContent_rptListedPlayers_SkillTable_{x}_sdperimDef_{x}_linkDen_{x}')
    igrac['zunanjaObramba'] = zunajna.get_attribute('title')

    vodenje = driver.find_element(by='id',
                                  value=f'cphContent_rptListedPlayers_SkillTable_{x}_sdhandling_{x}_linkDen_{x}')
    igrac['vodenjeZoge'] = vodenje.get_attribute('title')

    prodiranje = driver.find_element(by='id',
                                     value=f'cphContent_rptListedPlayers_SkillTable_{x}_sddriving_{x}_linkDen_{x}')
    igrac['prodiranje'] = prodiranje.get_attribute('title')

    podajanje = driver.find_element(by='id',
                                    value=f'cphContent_rptListedPlayers_SkillTable_{x}_sdpassing_{x}_linkDen_{x}')
    igrac['podajanje'] = podajanje.get_attribute('title')

    podKosem = driver.find_element(by='id',
                                   value=f'cphContent_rptListedPlayers_SkillTable_{x}_sdinsideShot_{x}_linkDen_{x}')
    igrac['metPodKosem'] = podKosem.get_attribute('title')

    obrambaPod = driver.find_element(by='id',
                                     value=f'cphContent_rptListedPlayers_SkillTable_{x}_sdinsideDef_{x}_linkDen_{x}')
    igrac['obrambaPodKosem'] = obrambaPod.get_attribute('title')

    skok = driver.find_element(by='id',
                               value=f'cphContent_rptListedPlayers_SkillTable_{x}_sdrebound_{x}_linkDen_{x}')
    igrac['skok'] = skok.get_attribute('title')

    blokade = driver.find_element(by='id',
                                  value=f'cphContent_rptListedPlayers_SkillTable_{x}_sdshotBlock_{x}_linkDen_{x}')
    igrac['blokade'] = blokade.get_attribute('title')

    vzdržljivost = driver.find_element(by='id',
                                       value=f'cphContent_rptListedPlayers_SkillTable_{x}_sdstamina_{x}_linkDen_{x}')
    igrac['vzdrzljivost'] = vzdržljivost.get_attribute('title')

    prosti = driver.find_element(by='id',
                                 value=f'cphContent_rptListedPlayers_SkillTable_{x}_sdfreeThrow_{x}_linkDen_{x}')
    igrac['prostiMeti'] = prosti.get_attribute('title')

    return igrac

  # RANGE HERE IS NUMBER OF PAGES
  for i in range(1):
    # RANGE HERE IS PLAYERS PER PAGE === MAX IS 10
    for x in range(10):
      y = x+1
      player = {}

      # GET PLAYER DATA TEXT
      element = driver.find_element(by="xpath", value=f'/html/body/div[4]/form/div[5]/div/div[3]/div[2]/div/div[6]/div/div[{y}]/div[2]/table/tbody/tr/td[1]/table/tbody/tr/td')
      text = element.text.strip()
      splittedText = text.split()

      # GET PLAYER ID
      headerElement = driver.find_element(by="xpath", value=f'/html/body/div[4]/form/div[5]/div/div[3]/div[2]/div/div[6]/div/div[{y}]/div[1]')
      headerText = headerElement.text
      match = re.search(r"\((\d+)\)", headerText)
      id = match.group(1)

      print(splittedText)
      # GET PLAYER DATA STATS
      igrac = getPlayerData(splittedText, id)

      # GET PLAYER SKILLS
      celIgrac = getPlayerStats(igrac, x)
      players.append(celIgrac)

    driver.find_element(by="id", value="cphContent_btnNextPage").click()
    time.sleep(2)


  #df = pd.DataFrame(players)

  # Save to CSV
  #df.to_csv("output.csv", index=False)

  driver.quit()

  return players










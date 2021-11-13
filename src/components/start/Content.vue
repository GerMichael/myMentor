<template>
  <main>
    <article>
      <section class="flexbox-box vertical-align-middle" id="concept">
        <div class="first">
          <img
            src="../../assets/start/illustration_whatismymentor.svg"
            alt="Digitale Zeichnung von zwei Personen, eine sitzend auf einem Tablet, die andere liegend vor dem Tablatt, Kaffeetasse, Nachrichtenaustausch"
          />
        </div>
        <div>
          <h1>Was ist myMentor?</h1>
          <h3>Das Konzept von myMentor</h3>
          <p>Lernen und Lehren als ein Geben und Nehmen - das ist das Kernkonzept von myMentor. Du suchst jemanden, der dir dabei Hilft deine Kochkünste zu verbessern oder ein besseres Gefühl für Farben und Komposition zu bekommen? Oder möchtest du lieber jemandem beibringen richtig zu programmieren und im Gegenzug dafür lernen, wie Kakteen wirklich gepflegt werden? Bei myMentor stehen dir die Türen dafür offen!</p>
          <p>Wir bieten dir die Möglichkeit im direkten Austausch zu lernen und lehren: mal als Mentor, mal als Mentee. So profitiert ihr beide! Eine weitere Möglichkeit zum Wissensaustausch sind die myMentor-Gruppen. Hier könnt ihr als Team von einem Mentor lernen ohne selbst jemandem etwas beibringen zu müssen. Doch aufgepasst: eure myMentor-Credits dafür könnt ihr nicht kaufen, nur selbst durch das Leiten solcher Gruppen verdienen. Es soll ja weiterhin ein Geben und Nehmen bleiben.</p>
          <p>Für viel Vielfalt an Themen brauchen wir natürlich dich als Mentor, also nicht zögern, sondern gleich ab ins Lern- und Lehrvergnügen!</p>
          <router-link to="/registration" tag="button">jetzt registrieren</router-link>
        </div>
      </section>
      <section id="advantages">
        <h2>Welche Vorteile hat myMentor?</h2>
        <div class="flexbox-box">
          <div>
            <img
              src="../../assets/start/illustration_together.svg"
              alt="Ein Mann und eine Frau bauen einen Turm aus XXL-Würfeln gemeinsam"
            />
            <h3>Gemeinsam zum Ziel</h3>
            <p>Einzelkämpfer gibt es hier nicht, gemeinsam ist es doch eh schöner! MyMentor bietet den Rahmen um sich auf Basis eurer Skills und Interessen zu finden... und dann kanns auch schon mit dem Lernen und Lehren losgehen.</p>
          </div>
          <div>
            <img
              src="../../assets/start/illustration_anywhere.svg"
              alt="Frau vor Computer während Online-Meeting mit zwei anderen Personen"
            />
            <h3>Unendliche Möglichkeiten</h3>
            <p>Egal was man lernen will, egal von wo aus man das möchte. MyMentor unterstützt dabei eine unendliche Vielfalt an Skills zu erlernen ohne dabei an einen Ort gebunden zu sein. Da eröffnen sich ganz andere Möglichkeiten!</p>
          </div>
        </div>
      </section>
    </article>
  </main>
</template>

<!-- GGF Subcomponents -->

<style scoped>
main {
  padding: 45px 7% 70px;
}

section {
  margin-bottom: 75px;
}

.flexbox-box {
  display: flex;
  justify-content: space-between;
}

.flexbox-box.vertical-align-middle {
  align-items: center;
}

.flexbox-box.vertical-align-middle div.first {
  width: 54%;
}

.flexbox-box div {
  width: 43%;
}

button {
  background-color: var(--app-color-brand-1);
  padding: 14px 30px 15px;
  font-size: 22px;
  border: none;
  border-radius: 10px;
  margin-top: 25px;
  color: var(--app-color-almost-white);
  transition: background-color 0.3s;
}

button:hover {
  background-color: var(--app-color-brand-2);
}
</style>
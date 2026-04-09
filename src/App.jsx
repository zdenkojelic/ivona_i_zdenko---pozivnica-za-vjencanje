import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    response: "",
    companions: [],
  });
  const [companionCount, setCompanionCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleResponseChange = (value) => {
    setFormData((prev) => ({ ...prev, response: value, companions: [] }));
    setCompanionCount(0);
  };

  const handleCompanionCountChange = (count) => {
    const num = parseInt(count);
    setCompanionCount(num);
    setFormData((prev) => ({
      ...prev,
      companions: Array(num).fill(""),
    }));
  };

  const handleCompanionNameChange = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.companions];
      updated[index] = value;
      return { ...prev, companions: updated };
    });
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.response) return;

    const entry = {
      ime: formData.name,
      odgovor: formData.response,
      pratnja: formData.response !== "ne-dolazim" ? formData.companions : [],
    };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbyEfQFLilwTVvXm8HkQAcyL0u8ywB4cDl38dB3Q1R493utRCeGTGAjz3Z4zusbOO0Eq/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        },
      );

      setSubmitted(true);
    } catch (error) {
      console.error("Greška:", error);
      alert("Došlo je do greške, pokušajte ponovno.");
    }
  };

  const showCompanions =
    formData.response === "vjencanje" || formData.response === "vecera";
  const scrollToPage2 = () => {
    document.getElementById("page-2").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="invitation-wrapper">
      <div className="deco-corner-top">
        <img className="left" src="/deco-corner.png" alt="" />
        <img className="right" src="/deco-bg.png" alt="" />
        <img className="right2" src="/deco-bg.png" alt="" />
        <div className="deco-diagonal" />
      </div>
      <div className="page-1">
        {/* HEADER */}
        <div className="section header-section">
          <p className="label-text">POZIVNICA ZA VJENČANJE</p>
          <div className="gold-line" />
          <h1 className="name-script">Ivona</h1>
          <span className="ampersand">&amp;</span>
          <h1 className="name-script">Zdenko</h1>
          <div className="gold-line" />
          <p className="invite-text">
            S radošću Vas pozivamo da budete
            <br />
            dio našeg vjenčanja
          </p>
          <p className="quote-text">
            „Ljubav je strpljiva, ljubav je dobrostiva; ne zavidi, ne hvasta se,
            ne nadima se. Sve pokriva, sve vjeruje, svemu se nada, sve podnosi.
            Ljubav nikada ne prestaje."
          </p>
          <p className="quote-ref">(1 Kor 13,4–8)</p>
        </div>

        {/* RINGS DIVIDER */}
        <div className="rings-divider">
          <img src="/deco-rings.png" alt="prstenje" className="rings-img" />
        </div>
        <div className="scroll-down" onClick={scrollToPage2}>
          <p className="scroll-text">VIŠE INFORMACIJA</p>
          <div className="scroll-arrow">&#8964;</div>
        </div>
      </div>
      <div className="page-2" id="page-2">
        {/* DATE SECTION */}
        <div className="section date-section">
          <p className="section-label">DATUM VJENČANJA</p>
          <h2 className="date-text">26. lipnja 2026.</h2>
          <div className="gold-line short" />
        </div>

        {/* CEREMONY SECTION */}
        <div className="section info-section">
          <div className="event-block">
            <p className="event-label">OBRED VJENČANJA — 17:00 SATI</p>
            <a
              href="https://maps.app.goo.gl/DoW8vEXHrhYe4UYv5"
              target="_blank"
              rel="noopener noreferrer"
              className="location-link"
            >
              Crkva Uzvišenja BDM Osova
            </a>
          </div>

          <div className="gold-line short" />

          <div className="event-block">
            <p className="event-label">SVEČANA VEČERA — 19:00 SATI</p>
            <a
              href="https://maps.app.goo.gl/CEnZBFZkZexZDYCq8"
              target="_blank"
              rel="noopener noreferrer"
              className="location-link"
            >
              Restoran California
            </a>
          </div>

          <div className="gold-line short" />

          <p className="confirm-note">
            Molimo Vas da svoj dolazak potvrdite
            <br />
            najkasnije do <strong>30. svibnja 2026.</strong>
          </p>

          <div className="contact-block">
            <p className="section-label">KONTAKT</p>
            <p className="contact-text">Ivona: +385 91 765 7951</p>
            <p className="contact-text">Zdenko: +385 91 928 2018</p>
          </div>
        </div>

        {/* RSVP SECTION */}
        <div className="section rsvp-section">
          <p className="section-label">POTVRDITE DOLAZAK</p>

          {!submitted ? (
            <div className="rsvp-form">
              <div className="field-group">
                <label className="field-label">Ime i prezime</label>
                <input
                  type="text"
                  className="text-input"
                  placeholder="Vaše ime i prezime"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              <div className="field-group">
                <label className="field-label">Vaš odgovor</label>

                {[
                  { value: "vjencanje", label: "Dolazim na vjenčanje" },
                  { value: "vecera", label: "Dolazim na svečanu večeru" },
                  { value: "ne-dolazim", label: "Ne dolazim" },
                ].map((opt) => (
                  <div
                    key={opt.value}
                    className={`radio-option ${formData.response === opt.value ? "selected" : ""}`}
                    onClick={() => handleResponseChange(opt.value)}
                  >
                    <div className="radio-circle">
                      {formData.response === opt.value && (
                        <div className="radio-dot" />
                      )}
                    </div>
                    <span>{opt.label}</span>
                  </div>
                ))}
              </div>

              {showCompanions && (
                <div className="field-group">
                  <label className="field-label">Broj osoba u pratnji</label>
                  <select
                    className="text-input select-input"
                    value={companionCount}
                    onChange={(e) => handleCompanionCountChange(e.target.value)}
                  >
                    {Array.from({ length: 11 }, (_, i) => (
                      <option key={i} value={i}>
                        {i === 0
                          ? "Dolazim sam/a (0 pratnje)"
                          : `${i} ${i === 1 ? "osoba" : "osobe/osoba"}`}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {showCompanions && companionCount > 0 && (
                <div className="field-group">
                  <label className="field-label">Ime i prezime pratnje</label>
                  {Array.from({ length: companionCount }, (_, i) => (
                    <input
                      key={i}
                      type="text"
                      className="text-input"
                      placeholder={`Pratnja ${i + 1} — Ime i prezime`}
                      value={formData.companions[i] || ""}
                      onChange={(e) =>
                        handleCompanionNameChange(i, e.target.value)
                      }
                    />
                  ))}
                </div>
              )}

              <button className="submit-btn" onClick={handleSubmit}>
                Potvrdi
              </button>
            </div>
          ) : (
            <div className="success-message">
              <p>Hvala Vam! Vaš odgovor je zabilježen.</p>
            </div>
          )}

          <div className="gold-line short" />
          <p className="closing-text">Radujemo se Vašem dolasku ❤️</p>
        </div>
      </div>
    </div>
  );
}

export default App;

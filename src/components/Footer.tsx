import React from "react";
import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-lg border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <p className="text-gray-600 text-sm leading-relaxed">
              Aquest és un espai per compartir les opinions de nens i nenes de
              4t i 5è d'educació primària de Catalunya. Aquests alumnes han
              participat en el projecte "Preeemptive interventions for
              high-efficacy instruction on writing" (PRINT-W), finançat pel
              Ministerio de Innovación y Ciencia (ref. PID2022-137868NB-I00;
              investigadora principal: Naymé Salas). Aquesta web utilitza eines
              d'intel·ligència artificial per evitar que es comparteixi
              contingut diferent de textos manuscrits per infants de primària.
              Ni la investigadora principal i l'equip del projecte de recerca,
              ni el desenvolupador de la web no es fan responsables d'usos amb
              altres finalitats. Aquesta responsabilitat és exclusiva de qui
              penja contingut. ES RECOMANA LA SUPERVISIÓ PARENTAL EN TOT MOMENT.
            </p>

            {/* Logos */}
            <div className="flex flex-col md:flex-row items-center justify-start gap-6">
              <img
                src="/elbec.avif"
                alt="El Bec Logo"
                className="h-24 object-contain"
              />
              <img
                src="/gobierno.avif"
                alt="Gobierno Logo"
                className="h-24 object-contain"
              />
              <img
                src="/uab.avif"
                alt="UAB Logo"
                className="h-24 object-contain"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Shield className="h-5 w-5 mt-1 flex-shrink-0 text-[#193547]" />
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-800">Seguretat</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Espai segur per a infants. Ens prenem molt seriosament la
                  seguretat dels infants. Per això, les imatges que es penjen
                  són moderades, a més de les eines d'intel·ligència artificial
                  que s'han utilitzat en la seva construcció. No es recopila
                  informació personal dels usuaris de la web, garantint, així,
                  la seva confidencialitat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


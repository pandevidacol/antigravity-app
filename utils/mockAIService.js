/**
 * Simulates a Vision AI analysis process with "Thinking" steps.
 * @param {string} imageSrc - Base64 or Blob URL of the image.
 * @param {function} onProgress - Callback for status updates (e.g., "Scanning...").
 * @returns {Promise<string>} - Resolves with the final CSV line.
 */
export async function analyzeImageMock(imageSrc, onProgress) {
  const steps = [
    { msg: "Iniciando motor de visión...", delay: 800 },
    { msg: "Localizando serial del medidor...", delay: 1500 },
    { msg: "Extrayendo lectura de consumo...", delay: 1500 },
    { msg: "Verificando integridad física...", delay: 1200 },
    { msg: "Generando reporte estructurado...", delay: 800 }
  ];

  for (const step of steps) {
    onProgress(step.msg);
    await new Promise(r => setTimeout(r, step.delay));
  }

  // Generate a random but realistic result
  const today = new Date().toISOString().split('T')[0];
  const serialSuffix = Math.floor(10000 + Math.random() * 90000);
  const reading = Math.floor(1000 + Math.random() * 5000).toString().padStart(5, '0');
  const serial = `SN-${serialSuffix}-X`;
  
  // Format: Fecha, Numero_Medidor, Lectura_Actual, Concatenado, Notas_Anomalias
  return `${today}, ${serial}, ${reading}, ${reading}-${serial}, SIN_NOVEDAD`;
}

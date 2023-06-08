const display = document.querySelector("#display");
const buttonEqual = document.querySelector("button.btn-equal");
const buttonReset = document.querySelector("button.btn-reset");


window.onload = function () {
  document.getElementById("calculate").click(); };
  
// https://stackoverflow.com/a/66902484
function linspace(start, stop, num, endpoint = true) {
  const div = endpoint ? (num - 1) : num;
  const step = (stop - start) / div;
  return Array.from({length: num}, (_, i) => start + step * i);
}

function displayPlot(xArray, yArray, xlabel, plotName){

  // Define Data
  const data = [{
    x:xArray,
    y:yArray,
    mode:"markers"
  }];

  // Define Layout
  const layout = {
    xaxis: {range: [Math.min.apply(null, xArray), Math.max.apply(null, xArray)], title: xlabel},
    yaxis: {range: [Math.min.apply(null, yArray), Math.max.apply(null, yArray)], title: "Estimated Value"},  
    title: "Estimated Value vs." + xlabel
  };

  // Display using Plotly
  Plotly.newPlot(plotName, data, layout);
}

function Plot(){
  const growth = document.querySelector("#growth-rate").valueAsNumber;
  const discount = document.querySelector("#discount-rate").valueAsNumber;

  const growthArray = linspace(growth*0.8, growth*1.2, 100);
  var yArray = new Array(growthArray.length).fill(0.);
  for(let i=0; i<growthArray.length;i++){ 
    yArray[i] = calculate(growthArray[i], discount);
  }

  displayPlot(growthArray, yArray, "Growth Rate (in %)", "growthPlot")
  const discountArray = linspace(discount*0.8, discount*1.2, 100);
  for(let i=0; i<discountArray.length;i++){ 
    yArray[i] = calculate(growth, discountArray[i]);
  }
  displayPlot(discountArray, yArray, "Discount Rate (in %)", "discountPlot");

}

function calculate(growthParam, discountParam){
  const cf = document.querySelector("#cash-flow").valueAsNumber;
  const growth = (growthParam === undefined) ? document.querySelector("#growth-rate").valueAsNumber : growthParam;
  const discount = (discountParam === undefined) ? document.querySelector("#discount-rate").valueAsNumber : discountParam;

  const tgrowth = document.querySelector("#terminal-growth-rate").valueAsNumber;
  const shares = document.querySelector("#num-shares").valueAsNumber;
  const cash = document.querySelector("#total-cash").valueAsNumber;
  const debt = document.querySelector("#total-debt").valueAsNumber;
  
  if (tgrowth===discount) {
    const errorMessage = 'Set Terminal growth rate != to discount rate';
    display.innerText = errorMessage;
    throw new Error(errorMessage);
  }

  const futureCf = new Array(11).fill(cf);
  const presentValues = new Array(11).fill(cf);

  for(let i=1; i<=10;i++){
    futureCf[i] = futureCf[i-1] * (1 + growth/100);
    presentValues[i] = futureCf[i]/((1+discount/100)**i);
  }
  const terminalCf = futureCf[futureCf.length-1]*(1+growth/100);
  // Total NPV of Year 1-10 Cash Flows:
  const npvCf = presentValues.slice(1, 11).reduce((a, b) => a + b, 0);
  const terminalValue = terminalCf/(discount/100-tgrowth/100);
  const npvTV = terminalValue/((1+discount/100)**11);
  // Total PV of Cash Flows
  const totalPVCf = npvTV + npvCf;
  const value = (totalPVCf + cash - debt)/shares;
  return value
}

buttonEqual.onclick = () => {
  const dcfValue = calculate();
  display.innerText = "DCF Estimate:  " + dcfValue.toFixed(2);
  Plot();
};

buttonReset.onclick = () => {
  Plotly.purge('growthPlot');
  Plotly.purge('discountPlot');
};


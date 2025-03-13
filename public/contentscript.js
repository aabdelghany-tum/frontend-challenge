console.log('Contentscript injected');

// let element = ...;

// ...

// const parentElement = document.querySelector(
//   '#root > div > div > div.makeStyles-mainPanel-3 > div.makeStyles-scrollbars-5 > div:nth-child(1) > div > section > div:nth-child(2) > h2',
// );


const euroElement = document.querySelector(
  '#root > div > div > div.makeStyles-mainPanel-3 > div.makeStyles-scrollbars-5 > div:nth-child(1) > div > section > div:nth-child(3)'
);

if (euroElement) {
    const euroMatch = euroElement.textContent.match(/(\d+\s?€)/);
    const euroValue = euroMatch ? euroMatch[0] : 'N/A';
  
    const injectedElement = document.createElement('div');
    injectedElement.innerHTML = `
    <img src="public/images/favicon-32x32.png" alt="Logo" style="height: 20px; margin-right: 8px; vertical-align: middle;">
    Budget-to-Beat: ${euroValue}`;
    injectedElement.textContent = `Budget-to-Beat: ${euroValue}`;
    injectedElement.setAttribute('style', `
      position: absolute;
      top: 20px;
      right: 20px;
      padding: 8px 15px;
      background-color: #0B378C;
      color: white;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0px 3px 6px rgba(0,0,0,0.2);
      z-index: 1000;
    `);
  
    document.body.appendChild(injectedElement);


  injectedElement.addEventListener('click', () => {
    alert('🌍 Climate change refers to significant changes in global temperatures and weather patterns over time. Human activities are the primary driver of these changes.');
  });

} else {
  console.warn('Parent element not found!');
}

console.log('Contentscript injected');

// let element = ...;

// ...

// const parentElement = document.querySelector(
//   '#root > div > div > div.makeStyles-mainPanel-3 > div.makeStyles-scrollbars-5 > div:nth-child(1) > div > section > div:nth-child(2) > h2',
// );

// Function to fetch top 3 Climate Change repositories from GitHub
async function fetchTopClimateChangeRepos() {
    try {
      const response = await fetch(
        'https://api.github.com/search/repositories?q=climate+change&sort=stars&order=desc&per_page=3'
      );
      const data = await response.json();
      console.log('DATA::::', data.items);
      return data.items;
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error);
      return [];
    }
  }
// Locate the Euro budget element on the page
const euroElement = document.querySelector(
  '#root > div > div > div.makeStyles-mainPanel-3 > div.makeStyles-scrollbars-5 > div:nth-child(1) > div > section > div:nth-child(3)'
);

if (euroElement) {

    // Extract the Euro value from the selected element
    const euroMatch = euroElement.textContent.match(/(\d+\s?€)/);
    const euroValue = euroMatch ? euroMatch[0] : 'N/A';
  
    // Create a new DOM element to display the Budget-to-Beat value
    const injectedElement = document.createElement('div');
    injectedElement.innerHTML = `
    <img src="/images/favicon-32x32.png" alt="Logo" style="height: 20px; margin-right: 8px; vertical-align: middle;">
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

    // Append the injected element to the document body
  
    document.body.appendChild(injectedElement);

        // Add an event listener to show an alert on click
  injectedElement.addEventListener('click', () => {
    alert('🌍 Climate change refers to significant changes in global temperatures and weather patterns over time. Human activities are the primary driver of these changes.');
  });
  // Fetch GitHub repositories and append them to the DOM
fetchTopClimateChangeRepos().then(repos => {
    console.log('Appending repositories to the DOM...'); 
    const repoContainer = document.createElement('div');
    repoContainer.setAttribute(
      'style',
      `
      padding: 15px;
      background-color: #E8EAF6;
      border-radius: 8px;
      margin-top: 20px;
      font-family: Arial, sans-serif;
      color: #333;
      box-shadow: 0px 3px 6px rgba(0,0,0,0.1);
      max-width: 600px;
    `
    );

    // Create and append the title for the repositories section
    const title = document.createElement('h2');
    title.textContent = 'Top 3 Climate Change GitHub Repositories:';
    title.style.marginTop = '0';
    repoContainer.appendChild(title);

    // If repositories are available, create elements for each

    if (repos.length > 0) {
      repos.forEach((repo, index) => {
        const repoDescription = document.createElement('p');
        repoDescription.style.marginTop = '10px';
        repoDescription.innerHTML = `<strong>${index + 1}. <a href="${repo.html_url}" target="_blank">${repo.name}</a></strong>: ${repo.description || 'No description provided.'}`;
        repoContainer.appendChild(repoDescription);
      });
    } else {
        // Display error message if no repositories were fetched
      const errorDescription = document.createElement('p');
      errorDescription.textContent = 'Failed to fetch from Github API Search...';
      repoContainer.appendChild(errorDescription);
    }

    
    euroElement.parentNode.appendChild(repoContainer);
  });
} else {
  console.warn('Euro element not found!');
}

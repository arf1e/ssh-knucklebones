const commandBlock = document.querySelector('.page-header__command');
const feedbackClass = 'page-header__command--copied';

const copyText = (text) => {
  const input = document.createElement('input');
  input.setAttribute('value', text);
  document.body.appendChild(input);
  input.select();

  document.execCommand('copy');
  document.body.removeChild(input);
};

commandBlock.addEventListener('click', function () {
  const command = commandBlock.innerText;
  copyText(command);

  commandBlock.innerText = 'command copied to clipboard!';
  commandBlock.classList.add(feedbackClass);
  setTimeout(() => {
    commandBlock.innerText = command;
    commandBlock.classList.remove(feedbackClass);
  }, 2500);
});

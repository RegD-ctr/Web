const activeIntervals = {};

        function startImageRotation(cardElement) {
            const imgElement = cardElement.querySelector('.fleet-img');
            const baseName = cardElement.getAttribute('data-aircraft');
            const customExt = cardElement.getAttribute('data-ext') || 'JPG';
            
            let currentIndex = 1;
            
            const progressCircle = cardElement.querySelector('.loader-circle-progress');
            progressCircle.style.transition = 'none';
            progressCircle.style.strokeDashoffset = '75';
            
            progressCircle.getBoundingClientRect();
            
            progressCircle.style.transition = 'stroke-dashoffset 2s linear';
            progressCircle.style.strokeDashoffset = '0';

            activeIntervals[baseName] = setInterval(() => {
                currentIndex = (currentIndex % 4) + 1;
                
                imgElement.style.opacity = '0.3';
                
                setTimeout(() => {
                    if (currentIndex === 1) {
                        imgElement.src = 'img/' + baseName + '.' + customExt;
                    } else {
                        imgElement.src = 'img/' + baseName + '_' + currentIndex + '.JPG';
                    }
                    imgElement.style.opacity = '1';
                }, 150);

                progressCircle.style.transition = 'none';
                progressCircle.style.strokeDashoffset = '75';
                progressCircle.getBoundingClientRect();
                progressCircle.style.transition = 'stroke-dashoffset 2s linear';
                progressCircle.style.strokeDashoffset = '0';

            }, 2000);
        }

        function stopImageRotation(cardElement) {
            const imgElement = cardElement.querySelector('.fleet-img');
            const baseName = cardElement.getAttribute('data-aircraft');
            const customExt = cardElement.getAttribute('data-ext') || 'JPG';
            
            clearInterval(activeIntervals[baseName]);
            delete activeIntervals[baseName];

            const progressCircle = cardElement.querySelector('.loader-circle-progress');
            progressCircle.style.transition = 'none';
            progressCircle.style.strokeDashoffset = '75';

            imgElement.src = 'img/' + baseName + '.' + customExt;
        }

        function toggleFaq(element) {
            const answer = element.nextElementSibling;
            const icon = element.querySelector('span');
            
            if (answer.style.maxHeight && answer.style.maxHeight !== '0px') {
                answer.style.maxHeight = '0px';
                icon.innerText = '+';
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.innerText = '−';
            }
        }

        function openPanel(aircraftId) {
            const panels = document.querySelectorAll('.tech-aircraft-panel');
            panels.forEach(panel => {
                panel.style.opacity = '0';
                panel.classList.remove('active');
            });

            const buttons = document.querySelectorAll('.tab-btn');
            buttons.forEach(btn => btn.classList.remove('active'));

            const activePanel = document.getElementById('panel-' + aircraftId);
            activePanel.classList.add('active');
            
            buttons.forEach(btn => {
                if(btn.getAttribute('onclick').includes(aircraftId)) {
                    btn.classList.add('active');
                }
            });
        }
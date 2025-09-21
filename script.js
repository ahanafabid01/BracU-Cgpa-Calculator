/* script.js */

        document.getElementById('numCourses').addEventListener('input', function() {
            const numCourses = parseInt(this.value) || 0;
            const container = document.getElementById('coursesContainer');
            const coursesList = document.getElementById('coursesList');
            
            if (numCourses > 0) {
                container.style.display = 'block';
                coursesList.innerHTML = '';
                
                for (let i = 1; i <= numCourses; i++) {
                    const courseDiv = document.createElement('div');
                    courseDiv.className = 'course-item';
                    courseDiv.innerHTML = `
                        <div class="course-number">${i}</div>
                        <div class="course-inputs">
                            <div class="grade-input">
                                <label>CGPA (0-4.0)</label>
                                <input type="number" id="grade${i}" min="0" max="4" step="0.01" placeholder="3.7">
                            </div>
                            <div>
                                <label>Credits</label>
                                <div class="credit-toggle" id="creditToggle${i}">
                                    <div class="credit-option active" onclick="setCredit(${i}, 3)">3</div>
                                    <div class="credit-option" onclick="setCredit(${i}, 4)">4</div>
                                </div>
                                <input type="hidden" id="credit${i}" value="3">
                            </div>
                        </div>
                    `;
                    coursesList.appendChild(courseDiv);
                }
            } else {
                container.style.display = 'none';
            }
        });

        function setCredit(courseNum, credit) {
            const toggle = document.getElementById(`creditToggle${courseNum}`);
            const options = toggle.querySelectorAll('.credit-option');
            const hiddenInput = document.getElementById(`credit${courseNum}`);
            
            options.forEach(option => option.classList.remove('active'));
            if (credit === 3) {
                options[0].classList.add('active');
            } else {
                options[1].classList.add('active');
            }
            
            hiddenInput.value = credit;
        }

        function calculateCGPA() {
            const prevCgpa = parseFloat(document.getElementById('prevCgpa').value) || 0;
            const prevCredits = parseFloat(document.getElementById('prevCredits').value) || 0;
            const numCourses = parseInt(document.getElementById('numCourses').value) || 0;
            
            if (numCourses === 0) {
                alert('Please enter the number of courses for this semester.');
                return;
            }
            
            let totalNewGradePoints = 0;
            let totalNewCredits = 0;
            let hasEmptyGrades = false;
            
            for (let i = 1; i <= numCourses; i++) {
                const gradeInput = document.getElementById(`grade${i}`);
                const creditInput = document.getElementById(`credit${i}`);
                
                const cgpa = parseFloat(gradeInput.value);
                const credit = parseFloat(creditInput.value);
                
                if (isNaN(cgpa) || cgpa < 0 || cgpa > 4) {
                    hasEmptyGrades = true;
                    gradeInput.style.borderColor = '#e74c3c';
                } else {
                    gradeInput.style.borderColor = '#e1e8ed';
                    totalNewGradePoints += cgpa * credit;
                    totalNewCredits += credit;
                }
            }
            
            if (hasEmptyGrades) {
                alert('Please fill in all course CGPAs with valid values (0-4.0).');
                return;
            }
            
            // Calculate new CGPA using the provided formula
            const totalPrevGradePoints = prevCgpa * prevCredits;
            const newCGPA = (totalPrevGradePoints + totalNewGradePoints) / (prevCredits + totalNewCredits);
            
            // Display result
            const resultDiv = document.getElementById('result');
            const cgpaValue = document.getElementById('cgpaValue');
            
            cgpaValue.textContent = newCGPA.toFixed(2);
            resultDiv.classList.add('show');
            
            // Scroll to result
            resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
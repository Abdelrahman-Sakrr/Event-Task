let customerName = document.querySelector(".customerName")
let amount = document.querySelector(".amount")
let customer = document.getElementById("myChart").getContext("2d");
let transactionChart;
let loader = document.querySelector(".myLoader");
document.addEventListener("DOMContentLoaded" , function(){
	loader.classList.add("d-none")
})
//fetch data
async function customersLoad(){
	//loader
	loader.classList.toggle("d-none");
	//fetch 
	let load = await fetch(`http://localhost:3000/customers`)
	let response = await load.json();
	//loader
	loader.classList.toggle("d-none");
	// send response as a param
	transactionLoad(response)
	
}
async function transactionLoad(customers){
	//fetch
	let load = await fetch(`http://localhost:3000/transactions`)
	let response = await load.json();
	// send the two responses as params to filterCusomters
	filterCustomers(response , customers);
}

function filterCustomers(transactions, customers) {
	let filterNameValue = customerName.value.toLowerCase();
	let filterAmountValue = amount.value;

	let content = ``;
	let filteredTransactions = [];
	for (let i = 0; i < transactions.length; i++) {
		for (let j = 0; j < customers.length; j++) {
			let nameMatches = customers[j].name.toLowerCase().includes(filterNameValue);
			let amountMatches = transactions[i].amount == filterAmountValue || filterAmountValue === '';

			if (nameMatches && amountMatches) {
				if (transactions[i].customer_id == customers[j].id) {
					content += `
					<tr>
						<td>${transactions[i].customer_id}</td>
						<td>${transactions[i].id}</td>
						<td>${customers[j].name}</td>
						<td data-amount = ${transactions[i].amount}>${transactions[i].amount}</td>
						<td>${transactions[i].date}</td>
					</tr>
				`;

				filteredTransactions.push(transactions[i]);
				}
				

			}
		}
	}
	document.getElementById("rowData").innerHTML = content;
	    // Prepare data for the chart
		updateChart(filteredTransactions)
		

}
function updateChart(transactions) {
    const aggregatedData = transactions.reduce((acc, transaction) => {
        if (!acc[transaction.date]) {
            acc[transaction.date] = 0;
        }
        acc[transaction.date] += transaction.amount;
        return acc;
    }, {});

    const labels = Object.keys(aggregatedData);
    const values = Object.values(aggregatedData);

    if (transactionChart) {
        transactionChart.destroy();
    }

    transactionChart = new Chart(customer, {
        type: 'line',
        data: {
            labels: labels, //x-axis
            datasets: [{
                label: 'Transaction Amount',
                data: values, //y-axis
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}



// function myChart(name , amount){
// 	const data = [
// 		{ myName: name, myAmount: amount },
// 	  ];
// 	  new Chart(
// 		document.getElementById('myChart'),
// 		{
// 		  type: 'line',
// 		  data: {
// 			labels: data.map(row => row.myName),
// 			datasets: [
// 			  {
// 				label: 'Amount per day',
// 				data: data.map(row => row.myAmount)
// 			  }
// 			]
// 		  }
// 		}
// 	  );
	

// }


				// myChart(customers[j].name , transactions[i].amount);
				// console.log(customers[j].name);
				// console.log(transactions[i].amount);
				// myChart(customers[j].name , transactions[i].amount)
// particles
// particlesJS("particles-js", {"particles":{"number":{"value":250,"density":{"enable":true,"value_area":1000}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":1,"random":true,"anim":{"enable":true,"speed":3,"opacity_min":0,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":4,"size_min":0.3,"sync":false}},"line_linked":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":1,"direction":"none","random":true,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":600}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"bubble"},"onclick":{"enable":true,"mode":"repulse"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":250,"size":0,"duration":2,"opacity":0,"speed":3},"repulse":{"distance":400,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});



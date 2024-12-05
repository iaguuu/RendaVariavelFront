$(document).ready(function() {
			//Only needed for the filename of export files.
			//Normally set in the title tag of your page.document.title = 'Simple DataTable';
			//Define hidden columns by index
			var hCols = [0];
			// DataTable initialisation
			$('#example').DataTable({
				"dom": 
    				// Primeira linha: controles no topo da tabela
    				"<'row' "+ 
						"<'col-sm-4'B>"  +  // Coluna de largura 4: área para botões (ex: exportar, adicionar)
    				    "<'col-sm-2'l>" +   //Seletor de número de linhas (ex: 10, 25, 50) 
    				    //"<'col-sm-6'p <br/>i>" + // Coluna de largura 6: controles de paginação (ex: botões de "próxima" e "anterior") + Informações adicionais 
					">" +  
    				
					// Segunda linha: tabela principal					
    				"<'row' "+
						"<'col-sm-12'tr>>" + // Toda a largura (col-sm-12): área para o conteúdo da tabela (dados)

    				// Terceira linha: controles no final da tabela
					
    				"<'row'"+
					 	"<'col-sm-12'p <br/>i>" + // Paginação (ex: controle de navegação de páginas) + Informações adicionais (ex: "Mostrando 1 a 10 de X registros")
					">",          

				"lengthChange": false, // Habilita o seletor de linhas
				"pageLength": 10,    // Define o número de linhas padrão do grid
				"paging": true,
				"autoWidth": true,
				"columnDefs": [{
					"visible": false,
					"targets": hCols
				}],
				"buttons": [{
					extend: 'colvis',
					collectionLayout: 'three-column',
					text: function() {
						var totCols = $('#example thead th').length;
						var hiddenCols = hCols.length;
						var shownCols = totCols - hiddenCols;
						return 'Columns (' + shownCols + ' of ' + totCols + ')';
					},
					prefixButtons: [{
						extend: 'colvisGroup',
						text: 'Show all',
						show: ':hidden'
					}]
				}, {
					extend: 'collection',
					text: 'Export',
					buttons: [{
							text: 'Excel',
							extend: 'excelHtml5',
							footer: false,
							exportOptions: {
								columns: ':visible'
							}
						}, {
							text: 'CSV',
							extend: 'csvHtml5',
							fieldSeparator: ';',
							exportOptions: {
								columns: ':visible'
							}
						}]
					}]
				,oLanguage: {
            oPaginate: {
                sNext: '<span class="pagination-default">&#x276f;</span>',
                sPrevious: '<span class="pagination-default">&#x276e;</span>'
            }
        }
					,"initComplete": function(settings, json) {
						// Adjust hidden columns counter text in button -->
						$('#example').on('column-visibility.dt', function(e, settings, column, state) {
							var visCols = $('#example thead tr:first th').length;
							//Below: The minus 2 because of the 2 extra buttons Show all and Restore
							var tblCols = $('.dt-button-collection li[aria-controls=example] a').length - 1;
							$('.buttons-colvis[aria-controls=example] span').html('Columns (' + visCols + ' of ' + tblCols + ')');
							e.stopPropagation();
						});
					}
				});
			});
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontFamily: 'Helvetica',
  },
  header: {
    margin: 15,
    marginTop: 20,
    marginBottom: 0,
    padding: 15,
    fontSize: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 0,
    left: 0,
    right: 0,
  },
  footer: {
    bottom: 0,
    left: 0,
    right: 0,
    margin: 15,
    fontSize: 10,
  },
  text: {
    fontSize: 11,
    marginBottom: 3,
  },
  view: {
    borderBottom: '1px solid black',
    margin: 15,
    marginBottom: 5,
    marginTop: 0,
    padding: 5,
  },
});

// Create Document Component
export const Order = ({ order }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header} fixed>
          <Text>Pedido: #{order.id}</Text>
          <Text>Sucursal: {order.company?.name}</Text>
          <Text>Fecha: {order.created_at}</Text>
        </View>

        <View style={{ marginTop: 0, marginBottom: 'auto' }}>
          {order.items?.map(item => {
            return (
              <View style={styles.view} key={item.id} wrap={false}>
                <Text style={styles.text}>Proveedor: {item.vendor?.name}</Text>
                <Text style={styles.text}>
                  Artículo: {item.code} Color: {item.color} Talle: {item.size}
                </Text>
                <Text style={styles.text}>Pares: {item.quantity}</Text>
                {item.additional_information && (
                  <>
                    <Text style={styles.text}>Observaciones:</Text>
                    <Text style={styles.text}>
                      {item.additional_information}
                    </Text>
                  </>
                )}
              </View>
            );
          })}
        </View>

        <Text
          style={styles.footer}
          fixed
          render={({ pageNumber, totalPages }) =>
            `Página ${pageNumber} de ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
};

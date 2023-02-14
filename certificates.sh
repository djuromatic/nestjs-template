# create cert folder in this folder
mkdir -p certs
# check if mkcert installed if not throw error
if ! command -v mkcert &>/dev/null; then
    echo "mkcert could not be found"
    exit
fi

mkcert -install

#ask user for domain name
read -p "Enter domain name: " domain

#
mkcert ${domain}

#move and rename cert files
mv ${domain}.pem certs/cert.pem
mv ${domain}-key.pem certs/key.pem

#add 127.0.0.1 to domain name  in /usr/etc/hosts file
echo "127.0.0.1 ${domain}" | sudo tee -a /etc/hosts

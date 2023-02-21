# check if mkcert installed if not throw error
if ! command -v mkcert &>/dev/null; then
    echo "mkcert could not be found"
    exit
fi

mkcert -install

#set domain to bizzlet.dev
domain="bizzllet.test"

#generate cert
mkcert ${domain}

#create cert dir
mkdir -p certs/bizzllet

#move and rename cert files
mv ${domain}.pem certs/bizzllet/cert.pem
mv ${domain}-key.pem certs/bizzllet/key.pem

# if bizzlet.dev is not in /etc/hosts file add it
if ! grep -q "${domain}" /etc/hosts; then
    echo "127.0.0.1 ${domain}" | sudo tee -a /etc/hosts
fi
